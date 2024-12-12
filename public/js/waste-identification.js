document.addEventListener('DOMContentLoaded', function() {
  const cameraPreview = document.getElementById('camera-preview');
  const switchCameraBtn = document.getElementById('switch-camera');
  
  let stream;
  let facingMode = 'environment'; // Start with back camera
  let analysisInterval;

  // Initialize camera
  async function initCamera() {
    try {
      stream = await navigator.mediaDevices.getUserMedia({
        video: {
          facingMode: facingMode,
          width: { ideal: 1280 },
          height: { ideal: 720 }
        }
      });
      cameraPreview.srcObject = stream;

      // Start continuous analysis
      startContinuousAnalysis();
    } catch (err) {
      console.error('Error accessing camera:', err);
      alert('Unable to access camera. Please make sure you have granted camera permissions.');
    }
  }

  // Switch camera
  switchCameraBtn.addEventListener('click', async () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
    facingMode = facingMode === 'environment' ? 'user' : 'environment';
    await initCamera();
  });

  // Continuous analysis function
  function startContinuousAnalysis() {
    // Clear any existing interval
    if (analysisInterval) {
      clearInterval(analysisInterval);
    }

    // Analyze every 1 second
    analysisInterval = setInterval(() => {
      // Here you would typically send frames to your AI service
      // For now, we'll just simulate random results
      updateResults();
    }, 1000);
  }

  // Update results (mock function - replace with actual AI analysis)
  function updateResults() {
    const materials = ['Plastic', 'Paper', 'Glass', 'Metal', 'Organic'];
    const recyclable = ['Yes', 'No'];
    const methods = ['Recycling Bin', 'Compost', 'General Waste'];

    document.getElementById('material-type').textContent = 
      materials[Math.floor(Math.random() * materials.length)];
    document.getElementById('recyclable').textContent = 
      recyclable[Math.floor(Math.random() * recyclable.length)];
    document.getElementById('disposal-method').textContent = 
      methods[Math.floor(Math.random() * methods.length)];
  }

  // Initialize camera on page load
  initCamera();

  // Cleanup on page unload
  window.addEventListener('beforeunload', () => {
    if (analysisInterval) {
      clearInterval(analysisInterval);
    }
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
    }
  });

  function showCameraError(message) {
    const cameraContainer = document.querySelector('.camera-section');
    cameraContainer.innerHTML = `
      <div class="bg-red-500/10 border-2 border-red-500 rounded-lg p-8 text-center">
        <svg class="w-16 h-16 text-red-500 mx-auto mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"/>
        </svg>
        <h3 class="text-xl font-semibold text-white mb-2">Camera Access Error</h3>
        <p class="text-gray-200">${message}</p>
        <button onclick="initializeCamera()" class="mt-4 bg-white text-primary font-bold py-2 px-4 rounded-lg hover:bg-secondary transition-colors duration-300">
          Try Again
        </button>
      </div>
    `;
  }
}); 