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
        // collect cc field
        
        var ccNum = $('#card_number').val(),
        cvcNum = $('#card_code').val(), 
        expMonth = $('#date_month').val(),
        expYear = $('#card_year').val();
        
        //send card info to stripe 
        Stripe.createToken({
            number: ccNum,
            cvc: cvcNum,
            exp_month: expMonth,
            exp_year: expYear},
        stripeResponseHandler);
        //Stripe returns card token
        
        
    });
    
    
 
    //Stripe returns card token 
    //inject as hidden field
    
}); 




