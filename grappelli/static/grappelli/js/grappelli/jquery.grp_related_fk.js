/**
 * GRAPPELLI RELATED FK
 * foreign-key lookup
 */

(function($){
    var previous_id = 0;

    var methods = {
        init: function(options) {
            options = $.extend({}, $.fn.grp_related_fk.defaults, options);
            return this.each(function() {
                var $this = $(this);
                // remove djangos object representation
                if ($this.next().next() && $this.next().next().attr("class") != "errorlist") {
                    $this.next().next().remove();
                }
                // add placeholder
                $this.next().after(options.placeholder);
                // lookup
                lookup_id($this, options); // lookup when loading page
                previous_id = $this.val();
                $this.bind("change keyup blur focus", function() { // id-handler
                    if (previous_id != $this.val()) {
                        lookup_id($this, options);
                        previous_id = $this.val();    
                    }
                    
                });
            });
        }
    };
    
    $.fn.grp_related_fk = function(method) {
        if (methods[method]) {
            return methods[method].apply(this, Array.prototype.slice.call(arguments, 1));
        } else if (typeof method === 'object' || ! method) {
            return methods.init.apply(this, arguments);
        } else {
            $.error('Method ' +  method + ' does not exist on jQuery.grp_related_fk');
        };
        return false;
    };
    
    var lookup_id = function(elem, options) {
        var text = elem.next().next();
        $.getJSON(options.lookup_url, {
            object_id: elem.val(),
            app_label: grappelli.get_app_label(elem),
            model_name: grappelli.get_model_name(elem)
        }, function(data) {
            text.html(data[0].label);
        });
    };
    
    $.fn.grp_related_fk.defaults = {
        placeholder: '&nbsp;<strong></strong>',
        repr_max_length: 30,
        lookup_url: ''
    };
    
})(django.jQuery);