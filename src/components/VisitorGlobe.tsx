import { useEffect, useRef, useState } from 'react';
import Globe from 'react-globe.gl';

// Simulated visitor data
const visitorLocations = [
  { lat: 28.6139, lng: 77.2090, name: '📍 You (New Delhi, India)', size: 2.5, color: '#3b82f6' }, // Host
  { lat: 40.7128, lng: -74.0060, name: 'New York, USA', size: 1, color: '#10b981' },
  { lat: 51.5074, lng: -0.1278, name: 'London, UK', size: 1, color: '#f59e0b' },
  { lat: 35.6762, lng: 139.6503, name: 'Tokyo, Japan', size: 1, color: '#ef4444' },
  { lat: -33.8688, lng: 151.2093, name: 'Sydney, Australia', size: 1, color: '#8b5cf6' },
  { lat: 1.3521, lng: 103.8198, name: 'Singapore', size: 1, color: '#ec4899' },
  { lat: 48.8566, lng: 2.3522, name: 'Paris, France', size: 1, color: '#14b8a6' },
  { lat: -23.5505, lng: -46.6333, name: 'São Paulo, Brazil', size: 1, color: '#f97316' },
];

// Generate arcs from Delhi to other locations
const arcsData = visitorLocations.slice(1).map(loc => ({
  startLat: visitorLocations[0].lat,
  startLng: visitorLocations[0].lng,
  endLat: loc.lat,
  endLng: loc.lng,
  color: [visitorLocations[0].color, loc.color],
}));

export function VisitorGlobe() {
  const globeRef = useRef<any>(null);
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(true);

  useEffect(() => {
    const updateDimensions = () => {
      if (containerRef.current) {
        setDimensions({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight || containerRef.current.offsetWidth,
        });
      }
    };

    updateDimensions();
    window.addEventListener('resize', updateDimensions);
    
    // Check initial theme
    setIsDark(document.documentElement.classList.contains('dark'));
    
    // Setup mutation observer to watch for theme changes
    const observer = new MutationObserver((mutations) => {
      mutations.forEach((mutation) => {
        if (mutation.attributeName === 'class') {
          setIsDark(document.documentElement.classList.contains('dark'));
        }
      });
    });
    
    observer.observe(document.documentElement, { attributes: true });
    
    return () => {
      window.removeEventListener('resize', updateDimensions);
      observer.disconnect();
    };
  }, []);

  useEffect(() => {
    if (globeRef.current) {
      // Auto-rotate
      globeRef.current.controls().autoRotate = true;
      globeRef.current.controls().autoRotateSpeed = 1.5;
      globeRef.current.controls().enableZoom = false;
      
      // Point to India initially
      globeRef.current.pointOfView({ lat: 20, lng: 80, altitude: 2.5 }, 2000);
    }
  }, [dimensions]);

  return (
    <div ref={containerRef} className="w-full h-full min-h-[400px] flex items-center justify-center cursor-grab active:cursor-grabbing">
      {dimensions.width > 0 && (
        <Globe
          ref={globeRef}
          width={dimensions.width}
          height={dimensions.height}
          backgroundColor="rgba(0,0,0,0)"
          globeImageUrl={isDark ? "//unpkg.com/three-globe/example/img/earth-dark.jpg" : "//unpkg.com/three-globe/example/img/earth-blue-marble.jpg"}
          bumpImageUrl="//unpkg.com/three-globe/example/img/earth-topology.png"
          
          // Points
          pointsData={visitorLocations}
          pointLat="lat"
          pointLng="lng"
          pointColor="color"
          pointAltitude={0.05}
          pointRadius="size"
          pointsMerge={false}
          
          // Arcs
          arcsData={arcsData}
          arcStartLat="startLat"
          arcStartLng="startLng"
          arcEndLat="endLat"
          arcEndLng="endLng"
          arcColor="color"
          arcDashLength={0.4}
          arcDashGap={0.2}
          arcDashAnimateTime={2000}
          arcAltitudeAutoScale={0.3}
          arcStroke={1}
          
          // Labels
          labelsData={visitorLocations}
          labelLat="lat"
          labelLng="lng"
          labelText="name"
          labelSize={1.5}
          labelDotRadius={0.5}
          labelColor={() => isDark ? 'rgba(255,255,255,0.8)' : 'rgba(0,0,0,0.8)'}
          labelResolution={2}
          labelAltitude={0.06}
        />
      )}
    </div>
  );
}
