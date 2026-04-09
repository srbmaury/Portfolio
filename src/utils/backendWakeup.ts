import API_BASE_URL from '../config/api';

/**
 * Sends a lightweight request to wake up the backend server
 * This is useful for services like Render that sleep after inactivity
 */
export const wakeUpBackend = async (): Promise<void> => {
  try {
    // Don't ping localhost
    if (API_BASE_URL.includes('localhost')) {
      console.log('[Backend Wakeup] Skipping wakeup for localhost');
      return;
    }

    console.log('[Backend Wakeup] Pinging backend to wake it up...');

    // Send a lightweight GET request with a short timeout
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000); // 5 second timeout

    await fetch(`${API_BASE_URL}/api/health`, {
      method: 'GET',
      signal: controller.signal,
    }).catch(() => {
      // Silently fail - the important thing is that we sent the request
      // Even if it times out, the backend should start waking up
    });

    clearTimeout(timeoutId);
    console.log('[Backend Wakeup] Backend ping sent successfully');
  } catch (error) {
    // Silently catch errors - we don't want to disrupt the user experience
    console.log('[Backend Wakeup] Wake-up request completed');
  }
};
