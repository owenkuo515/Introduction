$(function(){
	jQuery.each([{"add":"POST"},{"del":"DELETE"},{"edit":"PUT"}], function(i,obj) {
		$.each(obj,function(key,val){
			jQuery[key] = function( url, data, success, error ) {
				// shift arguments if data argument was omitted
				if ( jQuery.isFunction( data ) ) {
					error = success;
					success = data;
					data = undefined;
				}
				return jQuery.ajax({
					url: url,
					type: val,
					contentType : "application/json",
					data: JSON.stringify(data),
					success: success,
                    error: error
                });
			};
		});
	});
});