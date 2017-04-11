/* global $, Stripe */ 
//Document ready.

$(document).on('turbolinks:load', function(){
    var theForm = $('#pro_form');
    var submitBtn = $('#form-submit-btn');
    //Set Stripe public key. 
    Stripe.setPublishableKey( $('meta[name="stripe-key"]').attr('content'));
    // when user clicks form sub-btn.
    submitBtn.click(function(event){
        // prevent default sub behavior.
        
        event.preventDefault();
        submitBtn.val("Processing").prop('disbaled', true);
        // collect cc field
        
        var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(), 
        expMonth = $('#date_month').val(),
        expYear = $('#card_year').val();
        
        //Use Stripe.js library to check for card errors 
        // error handling
        var error = false 
        //Validate card # 
        
        if(!Stripe.card.validateCardNumber(ccNum)){
            error= true;
        }
        if(!Stripe.card.validateCVC(cvcNum)){
            error= true;
        }
        if(!Stripe.card.validateExpiry(expMonth, expYear)){
            error= true;
        }
        if(error) {
            //If there is an error, don't send to stripe
            alert('Credit card number is invalid') 
            submitBtn.prop('disabled',false).val("Sign Up") 
        }
        
        else {
        
        
        //send card info to stripe 
        Stripe.createToken({
            number: ccNum,
            cvc: cvcNum,
            exp_month: expMonth,
            exp_year: expYear},
        stripeResponseHandler);
        return false 
    }
        
        
    });
    
    
 
    //Stripe returns card token 
    function stripeResponseHandler(status, response) {
        // get token from response 
        var token = response.id;
        
        //inject as hidden field
        theForm.append( $('<input type "hidden" name="user[stripe_card_token]"> ').val(token));
    
        //Submit Form 
        theForm.get(0).submit; 
        
    } 
    
    
}); 




