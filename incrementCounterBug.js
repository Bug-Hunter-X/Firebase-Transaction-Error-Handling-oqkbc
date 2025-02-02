function incrementCounter(userId) {
  // Use a transaction to ensure atomicity
  return db.ref('users/' + userId + '/counter').transaction(function(currentCounter) {
    return currentCounter + 1;
  }).then(function(result) {
    if (result.committed) {
      console.log('Counter incremented successfully');
      return result.snapshot.val();
    } else {
      console.error('Counter increment failed:', result.error);
      return null;
    }
  }).catch(function(error) {
    console.error('Counter increment failed:', error);
    throw error;
  });
}