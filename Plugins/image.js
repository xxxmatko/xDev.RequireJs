/** 
 * RequireJS plugin for loading images.
 *
 * Author: xxxmatko
 * Version: 1.1.0.0122
 */
define(function(){
    // Global window object
    var global = (function() { return this; })();

    // Flags
    var CACHE_BUST_FLAG = "!bust";
    var BASE64_FLAG = "!base64";

    // Helper functions
    function _getMimeType(path) {
        path = path || "";

        if(path.lastIndexOf(".png") > 0) {
            return "image/png";
        }

        if(path.lastIndexOf(".gif") > 0) {
            return "image/gif";
        }        

        return "image/jpeg";
    }

    return {
        version: "1.1.0.0122",
        load : function(name, req, onLoad, config){
            // Get base64 or image?
            var isBase64 = false;
            
            // Create image
            var img = new Image();
            img.crossOrigin = "Anonymous";

            // Handle errors
            img.onerror = function (err) {
                onLoad.error(err);
            };

            // Handle success
            img.onload = function(evt){
                // Release memory
                try {
                    delete img.onload; 
                } 
                catch(err) {
                    // IE7
                    img.onload = function (){};
                }

                if(!isBase64) {
                    onLoad(img);
                    return;
                }

                var canvas = global.document.createElement("canvas");
                var ctx = canvas.getContext("2d");

                canvas.height = img.height;
                canvas.width = img.width;
                ctx.drawImage(img, 0, 0);
                onLoad(canvas.toDataURL(_getMimeType(name)));
                canvas = null; 
            };
            
            if (name.indexOf(BASE64_FLAG) !== -1) {
                isBase64 = true;
                img.src = req.toUrl(name.replace(BASE64_FLAG, ""));
            } 
            else {
                img.src = name;
            }
        },


        /**
         * Used normalize to avoid caching references to a "cache busted" request.
         */
        normalize : function (name, normalize) {
            if(name.indexOf(CACHE_BUST_FLAG) === -1) {
                return name;
            }

            var url = name.replace(CACHE_BUST_FLAG, "");
            url += (url.indexOf("?") < 0) ? "?" : "&";
            return url + "t=" + new Date().getTime();
        }
    };
});