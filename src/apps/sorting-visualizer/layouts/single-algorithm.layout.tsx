import { useAppDispatch, useAppSelector } from '@/host/store/hooks';
import MainLayout from './main.layout';
import NoInput from '@sortViz/components/visualizer/no-input';
import Visualizer from '@sortViz/components/visualizer/visualizer';
import { algoList } from '@sortViz/sorting-algorithms/algo-list';
import { setIsPlaying } from '@sortViz/store/sorting-visualizer.slice';
import { sortCompletionMessage } from '@sortViz/config';
import { toast } from 'sonner';
import useCompletion from '@sortViz/hooks/use-completion.hook';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

// OPTIMIZATION: Styles defined once, outside the render cycle
const styles = {
  container: {
    display: 'flex',
    flexDirection: 'column' as const,
    gap: '2rem',
    paddingBottom: '3rem'
  },
  detailsSection: {
    display: 'grid',
    // CHANGED: Forces two equal columns that start stacking on smaller screens
    gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
    gap: '2rem',
    color: 'white',
    alignItems: 'stretch' // Ensures both cards stretch to the same height
  },
  card: {
    background: 'rgba(30, 41, 59, 0.7)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    borderRadius: '12px',
    padding: '1.5rem',
    backdropFilter: 'blur(10px)',
    boxShadow: '0 4px 6px rgba(0,0,0,0.2)',
    height: '100%', // Forces card to fill grid cell height
    display: 'flex',
    flexDirection: 'column' as const
  },
  heading: {
    fontSize: '1.1rem',
    fontWeight: '700',
    marginBottom: '1rem',
    color: '#00f2ff',
    textTransform: 'uppercase' as const,
    letterSpacing: '1px'
  },
  statGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '1rem',
    marginBottom: '1rem'
  },
  statBox: {
    background: 'rgba(0,0,0,0.3)',
    padding: '0.75rem',
    borderRadius: '8px',
    textAlign: 'center' as const
  },
  statLabel: {
    fontSize: '0.8rem',
    color: '#94a3b8',
    marginBottom: '0.25rem'
  },
  statValue: {
    fontSize: '1.1rem',
    fontWeight: '600',
    color: 'white',
    fontFamily: 'monospace'
  },
  codeBlock: {
    background: '#0f172a',
    padding: '1.5rem',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,0.05)',
    fontFamily: "'Fira Code', 'Consolas', monospace",
    fontSize: '0.9rem',
    lineHeight: '1.5',
    color: '#cbd5e1',
    overflowX: 'auto' as const,
    // CHANGED: Height fills remaining space in the card
    flex: 1, 
    minHeight: '300px',
    whiteSpace: 'pre-wrap' as const
  },
  codeContainer: {
    display: 'flex', 
    flexDirection: 'column' as const, 
    height: '100%' // Important for stretching
  }
};

function SingleAlgorithmLayout() {
  const { algoName } = useParams();
  const dispatch = useAppDispatch();
  const array = useAppSelector((state) => state.sortViz.array);
  const reset = useAppSelector((state) => state.sortViz.reset);

  const selectedAlgo =
    algoList.find(({ name }) => name === algoName) ?? algoList[0];
  
  const { onComplete, isComplete } = useCompletion(1, reset);
  
  // SAFETY: Added optional chaining (?.) just to be 100% safe
  const metadata = selectedAlgo?.metadata || { 
     time: { best: '-', average: '-', worst: '-' }, 
     space: '-', 
     description: '', 
     code: '// Code not available yet' 
  };

  useEffect(() => {
    if (isComplete) {
      toast.success(sortCompletionMessage);
      dispatch(setIsPlaying(null));
    }
  }, [dispatch, isComplete]);

  if (array.length === 0) {
    return (
      <MainLayout>
        <NoInput />
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div style={styles.container}>
        
        {/* 1. VISUALIZER SECTION */}
        <div style={{ width: '100%', minHeight: '60vh' }}>
          <Visualizer
            key={selectedAlgo.name + array.toString() + reset}
            array={array}
            algoName={selectedAlgo.name}
            algoFn={selectedAlgo.fn}
            onComplete={onComplete}
          />
        </div>

        {/* 2. ALGORITHM DETAILS SECTION */}
        <div style={styles.detailsSection}>
          
          {/* Left Column: Stats & Description */}
          <div style={styles.card}>
            <div style={styles.heading}>Complexity Analysis</div>
            
            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ ...styles.statLabel, marginBottom: '0.5rem' }}>Time Complexity</div>
              <div style={styles.statGrid}>
                <div style={styles.statBox}>
                  <div style={styles.statLabel}>Best Case</div>
                  <div style={{ ...styles.statValue, color: '#4ade80' }}>{metadata.time.best}</div>
                </div>
                <div style={styles.statBox}>
                  <div style={styles.statLabel}>Average Case</div>
                  <div style={{ ...styles.statValue, color: '#facc15' }}>{metadata.time.average}</div>
                </div>
                <div style={styles.statBox}>
                  <div style={styles.statLabel}>Worst Case</div>
                  <div style={{ ...styles.statValue, color: '#ef4444' }}>{metadata.time.worst}</div>
                </div>
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ ...styles.statLabel, marginBottom: '0.5rem' }}>Space Complexity</div>
              <div style={styles.statBox}>
                <div style={styles.statValue}>{metadata.space}</div>
              </div>
            </div>

            <div style={{ flex: 1 }}> {/* Allows description to fill space if needed */}
               <div style={styles.heading}>Description</div>
               <p style={{ lineHeight: '1.6', color: '#cbd5e1' }}>{metadata.description}</p>
            </div>
          </div>

          {/* Right Column: Source Code */}
          {/* CHANGED: Wrapped in the same 'card' style to match appearance perfectly */}
          <div style={styles.card}>
             <div style={styles.heading}>Algorithm Implementation</div>
             <pre style={styles.codeBlock}>
               <code>{metadata.code}</code>
             </pre>
          </div>

        </div>
      </div>
    </MainLayout>
  );
}

export default SingleAlgorithmLayout;