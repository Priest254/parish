// Web Worker for processing church data
self.onmessage = function(e) {
    const churches = e.data;
    
    // Process churches data
    const processedChurches = churches.map((church, index) => {
        // Add ID if not present
        if (!church.properties.id) {
            church.properties.id = index;
        }
        
        // Extract city from address if not present
        if (!church.properties.City && church.properties.Address) {
            const addressParts = church.properties.Address.split(',');
            if (addressParts.length >= 2) {
                church.properties.City = addressParts[addressParts.length - 2].trim();
            }
        }
        
        return church;
    });
    
    // Send processed data back to main thread
    self.postMessage(processedChurches);
};
