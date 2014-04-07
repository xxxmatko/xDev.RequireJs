/** 
 * RequireJS plugin for loading modules with or without '.min' extension
 * according to the 'isDebug' configuration property.
 *
 * Author: xxxmatko
 * Version: 1.0.0.0407
 */
 
define(function() {
	return {
		version: "1.0.0.0407",
		load: function (name, req, onLoad, config) {
            // If it is release than use minified version
			if(!config.isDebug) {
				name += ".min";
			}

		    // Check for the js extension
			var url = req.toUrl(name);
            if (url.indexOf(".js") === -1) {
                url += ".js";
            }

            // Load the resource
			req([url], function(mod){
				onLoad(mod);
			});
		}
	}
});
