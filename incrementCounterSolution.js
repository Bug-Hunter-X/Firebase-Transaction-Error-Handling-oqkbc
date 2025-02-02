function incrementCounter(userId) {
  // Use a transaction to ensure atomicity
  return db.ref('users/' + userId + '/counter').transaction(function(currentCounter) {
    if (currentCounter === null) {
      return 1; // Handle the case where the counter doesn't exist
    }
    return currentCounter + 1;
  }).then(function(result) {
    if (result.committed) {
      console.log('Counter incremented successfully:', result.snapshot.val());
      return result.snapshot.val();
    } else {
      console.error('Counter increment failed:', result.error); 
      //Consider retrying the transaction or alternative handling strategy here, depending on error type
      return null; // Return null or an appropriate error value
    }
  }).catch(function(error) {
    console.error('Transaction failed:', error); // Log error details
    //Consider alternative handling strategy for errors preventing transaction execution
    throw error; // Re-throw the error or use custom error handling
  });
} 