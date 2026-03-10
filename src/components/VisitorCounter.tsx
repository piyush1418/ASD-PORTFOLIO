import { useEffect, useState } from 'react';
import { doc, getDoc, setDoc, updateDoc, increment, onSnapshot } from 'firebase/firestore';
import { db } from '../firebase';
import { Eye } from 'lucide-react';
import { motion } from 'motion/react';

export function VisitorCounter() {
  const [count, setCount] = useState<number | null>(null);

  useEffect(() => {
    const visitorDocRef = doc(db, 'stats', 'visitors');

    // Listen for real-time updates
    const unsubscribe = onSnapshot(visitorDocRef, (docSnap) => {
      if (docSnap.exists()) {
        setCount(docSnap.data().count);
      }
    }, (error) => {
      console.error("Firestore Error: ", JSON.stringify({
        error: error instanceof Error ? error.message : String(error),
        operationType: 'get',
        path: 'stats/visitors'
      }));
    });

    // Increment count if it's a new visit
    const incrementVisit = async () => {
      const hasVisited = localStorage.getItem('hasVisited');
      
      if (!hasVisited) {
        try {
          const docSnap = await getDoc(visitorDocRef);
          if (docSnap.exists()) {
            await updateDoc(visitorDocRef, {
              count: increment(1)
            });
          } else {
            await setDoc(visitorDocRef, {
              count: 1
            });
          }
          localStorage.setItem('hasVisited', 'true');
        } catch (error) {
          console.error("Firestore Error: ", JSON.stringify({
            error: error instanceof Error ? error.message : String(error),
            operationType: 'write',
            path: 'stats/visitors'
          }));
        }
      }
    };

    incrementVisit();

    return () => unsubscribe();
  }, []);

  if (count === null) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.5, duration: 0.8 }}
      className="absolute bottom-10 right-10 flex items-center gap-2 text-slate-500 dark:text-white/50 bg-black/5 dark:bg-white/5 px-4 py-2 rounded-full border border-black/10 dark:border-white/10 backdrop-blur-sm shadow-sm z-10"
    >
      <Eye className="w-4 h-4" />
      <span className="text-sm font-medium">
        {count} {count === 1 ? 'developer' : 'developers'} viewed this portfolio
      </span>
    </motion.div>
  );
}
