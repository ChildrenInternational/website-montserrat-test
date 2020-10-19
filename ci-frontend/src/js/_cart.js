Cart = (function($) {
    var modalCartSelector = '.unique-show-modal-cart';

    var updateCartCount = function () {
        var wagon = $('header').find('.wagon-wrap');
        var nav = $('nav').find('.wagon-wrap');

        function hide() {
            wagon.prop('hidden', true);
            nav.prop('hidden', true);
        }

        function setCount(length) {
            if (length > 0) {
                wagon.find('.badge').html(length);
                nav.find('.badge').html(length);
                wagon.removeProp('hidden');
                nav.removeProp('hidden');
            } else {
                hide();
            }
        }

        $.post('/api/cart/getcartcount')
            .done(function(data) {
                if (data && data.length > 0) {
                    setCount(data.length);
                } else {
                    hide();
                }
            }).fail(function() {
                console.log('failed: ');
                console.log(arguments);
            });
    };

    var reloadCart = function () {
        document.dispatchEvent(new CustomEvent('refresh-cart-event'));
        $(document).trigger('refresh-cart-review-event');
    };

    var openCartModal = function() {
        var $modalCart = $(modalCartSelector);
        if ($modalCart.length === 1) {
            var df = $.Deferred();
            df.done(reloadCart(), updateCartCount())
                .done(
                function ($mCart) {
                        $(document).trigger('close-all-modals-event');
                        $mCart.modal('show');
                });
            df.resolve($modalCart);
        }
    }

    var closeCartModal = function () {
        var $modalCart = $(modalCartSelector);
        if ($modalCart.length === 1) {
            updateCartCount();
            $modalCart.modal('hide');
        }
    }

    var postPayloadMultiple = function (url, payload) {
        return $.ajax({
            type: "POST",
            url: url,
            contentType: "application/json",
            data: JSON.stringify({ cmds: payload })
        });
    }

    var postPayload = function (url, payload) {
        return $.post(url, payload);
    }

    var addToPayLoad = function(payload, obj, propertyName) {
        if (!payload) payload = {};

        if (obj.hasOwnProperty(propertyName)) {
            var value = obj[propertyName];
            if (value) {
                payload[propertyName] = obj[propertyName];
            }
        }
    }

    var getPayloadObject = function(cartItem) {
        if (!cartItem) return null;

        var payload = {};
        addToPayLoad(payload, cartItem, 'Amount');
        addToPayLoad(payload, cartItem, 'ProductOptionId');
        addToPayLoad(payload, cartItem, 'Description');
        addToPayLoad(payload, cartItem, 'ChildIdentifier');
        addToPayLoad(payload, cartItem, 'InHonorOfDonation');
        addToPayLoad(payload, cartItem, 'OrderIdentifier');
        addToPayLoad(payload, cartItem, 'InvoiceIdentifier');
        addToPayLoad(payload, cartItem, 'Quantity');
        addToPayLoad(payload, cartItem, 'Comment');

        return payload;
    }

    var getPayloadMultiple = function (items) {
        var payloads = [];
        items.forEach(function (item) {
            payloads.push(getPayloadObject(item));
        });
        return payloads;
    }

    function getPayload(amount, productOptionId, cartDescription, childIdentifier, inHonorOf, orderIdentifier, invoiceIdentifier, comment) {
        var payload = {
            'Amount': amount,
            'ProductOptionId': productOptionId
        };

        if (cartDescription && cartDescription.length > 0) {
            payload['Description'] = cartDescription;
        }

        if (childIdentifier) {
            payload['ChildIdentifier'] = childIdentifier;
        }

        if (inHonorOf) {
            payload['InHonorOfDonation'] = inHonorOf;
        }

        if (orderIdentifier) {
            payload['OrderIdentifier'] = orderIdentifier;
        }

        if (invoiceIdentifier) {
            payload['InvoiceIdentifier'] = invoiceIdentifier;
        }

        if (comment) {
            payload['Comment'] = comment;
        }

        return payload;
    };

    var addToCart = function (amount, productOptionId, cartDescription, childIdentifier, inHonorOf) {
        var payload = getPayload(amount, productOptionId, cartDescription, childIdentifier, inHonorOf);
        return postPayload('/api/cart/add', payload);
    };

    var addOrderToCart = function (amount, productOptionId, cartDescription, childIdentifier, orderIdentifier, invoiceIdentifier) {
        var payload = getPayload(amount, productOptionId, cartDescription, childIdentifier, null, orderIdentifier, invoiceIdentifier);
        return postPayload('/api/cart/addorder', payload);
    };

    var addCommentToCart = function (amount, productOptionId, cartDescription, childIdentifier, inHonorOf, comment) {
        var payload = getPayload(amount, productOptionId, cartDescription, childIdentifier, inHonorOf, null, null, comment);
        return postPayload('/api/cart/addcomment', payload);
    };

    var addToCartMultiple = function (items) {
        var payload = getPayloadMultiple(items);
        return postPayloadMultiple('/api/cart/addmultiple', payload);
    };

    var addOrderToCartMultiple = function (items) {
        var payload = getPayloadMultiple(items);
        return postPayloadMultiple('/api/cart/addordermultiple', payload);
    };

    var addCommentToCartMultiple = function (items) {
        var payload = getPayloadMultiple(items);
        return postPayloadMultiple('/api/cart/addcommentmultiple', payload);
    };

    $(function () {
        if (window.location.href.indexOf('/MySocialCenter') !== -1) {
            updateCartCount();
        }

        var $modalCart = $(modalCartSelector);
        if ($modalCart.length === 1) {
            var $wagon = $('header').find('.wagon-wrap');

            $wagon.click(function(e) {
                e.preventDefault();
                openCartModal();
            });
        }
    });

    return {
        updateCartCount: updateCartCount,
        openCartModal: openCartModal,
        closeCartModal: closeCartModal,
        addToCart: addToCart,
        addOrderToCart: addOrderToCart,
        addCommentToCart: addCommentToCart,
        addToCartMultiple: addToCartMultiple,
        addOrderToCartMultiple: addOrderToCartMultiple,
        addCommentToCartMultiple: addCommentToCartMultiple
    };
})(jQuery)