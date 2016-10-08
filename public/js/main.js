/* Theme Name: Tripaco - Responsive Coming Soon Template
   Author: Zoyothemes
   Author e-mail: zoyothemes@gmail.com
   Version: 1.0
   Created: August 2016
   File Description:Main JS file of the template
*/


/* ==============================================
    1).Page Preloader
=============================================== */
$(window).load(function() {
    $('#status').fadeOut();
    $('#preloader').delay(350).fadeOut('slow');
    $('body').delay(350).css({
        'overflow': 'visible'
    });
});
/*---------------------------------------------------------------
	2). Fullpage
---------------------------------------------------------------*/
jQuery(function ($) {
    'use strict';
    
    
/* FULLPAGE */
	$('#fullpage').fullpage({
        anchors: ['Home', 'Synopsis', 'DirectorsNote', 'ProducersPage', 'CastnCrew'],
        menu: '#menu',
        scrollingSpeed: 800,
        autoScrolling: true,
        scrollBar: true,
        easing: 'easeInQuart',
        resize : false,
        paddingTop: '0px',
        paddingBottom: '80px',
        navigation: true,
        navigationPosition: 'right',
        navigationTooltips: ['Home', 'Subscribe', 'About','Services','Contact'],
        responsiveWidth: 1100,
    });

	$('a.go-slide').on( 'click', function() {
		var elem = $(this),
			slideID = elem.data('slide');
			
		$.fn.fullpage.moveTo(slideID);
	});
	
	if( $('body').hasClass('mobile') ) {
		$('#main-nav a').on( 'click', function() {
			$('.navbar-toggle').trigger('click');
		});
	};

/*---------------------------------------------------------------
	3). Countdown
---------------------------------------------------------------*/

	var countdown =  $('.countdown-time');

	createTimeCicles();

	$(window).on('resize', windowSize);

	function windowSize(){
		countdown.TimeCircles().destroy();
	    createTimeCicles();
		countdown.on('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd', function() {
    		countdown.removeClass('animated bounceIn');
    	});
	}

	// TimeCicles - Create and Options
	function createTimeCicles() {
		countdown.addClass('animated bounceIn');
		countdown.TimeCircles({
			bg_width: 0.5,
			fg_width: 0.03,
			circle_bg_color: '#fff',
			time: {
				Days: {color: '#ee6e73'},
            	Hours: {color: '#ee6e73'},
                Minutes: {color: '#ee6e73'},
                Seconds: {color: '#ee6e73'}
			}
		});

		countdown.on('webkitAnimationEnd mozAnimationEnd oAnimationEnd animationEnd', function() {
    		countdown.removeClass('animated bounceIn');
    	});
	}


/*---------------------------------------------------------------
	4). Piechart
---------------------------------------------------------------*/
    $('.about-chart').waypoint(function(){
		$('.easy-pie-chart').each(function () {
            var $this, $parent_width, $chart_size, height;
            $this = $(this);
            $parent_width = $(this).parent().width();
            $chart_size = $this.attr('data-size');
            if ($parent_width < $chart_size) {
                $chart_size = $parent_width;
            }
            
            height = parseInt($chart_size) + 30;

            $this.css('line-height', $chart_size + "px");
            $this.css('height', height + "px");

            $this.easyPieChart({
                animate: 2000,
                lineCap: 'butt',
                lineWidth: 5,
                size: 150,
                scaleColor: false,
                barColor: "#ee6e73",
                trackColor: "#b4c4d4",
                scaleColor: 'transparent',
                onStep: function (from, to, value) {
                    $(this.el).find('.percent-container .percent').html(Math.ceil(value) + "");
                    var $info =  $(this.el).find('.info');
                    $info.css("margin-left", -($info.width() / 2));

                }
            });

        });
        
	},{offset: '80%'});


/*=====================================================================
	5). Subscribe
=====================================================================*/

    var SubscribeForm = function () {
        this.$subscribeForm = $("#subscribe-form")
    };
    SubscribeForm.prototype.init = function () {
        var $this = this;
        //initializing the form using ajaxChimp
        this.$subscribeForm.ajaxChimp({});
    },
    $.SubscribeForm = new SubscribeForm, $.SubscribeForm.Constructor = SubscribeForm


    var Page = function() {
        this.$subscribeForm = $("#subscribe-form");
    };

    //
    Page.prototype.init = function () {
        var $this = this;
        //window related event

        //init subscribe app if form is added in a page
        if(this.$subscribeForm.length>0)
            $.SubscribeForm.init();
    },
    //init
    $.Page = new Page, $.Page.Constructor = Page


//initializing
    "use strict";
    $.Page.init()


/*========================================================================
	6). contact form Application
========================================================================*/
/*global jQuery */
    jQuery(function ($) {
    'use strict';

    /**
     * Contact Form Application
     */
    var ContactFormApp = {
        $contactForm: $("#ajax-form"),
        $contactFormBtn: $("#send"),
        $contactFormName: $("#name2"),
        $contactFormSubject: $("#subject2"),
        $contactFormEmail: $("#email2"),
        $contactFormMessage: $("#message2"),
        $confirmMessage: $("#ajaxsuccess"),
        $errorMessages: $(".error"),
        $errorName: $("#err-name"),
        $errorSubject: $("#err-subject"),
        $errorEmail: $("#err-emailvld"),
        $errorMessage: $("#err-message"),
        $errorForm: $("#err-form"),
        $errorTimeout: $("#err-timedout"),
        $errorState: $("#err-state"),

        //Validate Contact Us Data
        validate: function () {
            var error = false; // we will set this true if the form isn't valid

            var name = this.$contactFormName.val(); // get the value of the input field
            if(name == "" || name == " " || name == "Name") {
                this.$errorName.show(500);
                this.$errorName.delay(4000);
                this.$errorName.animate({
                    height: 'toggle'  
                }, 500, function() {
                    // Animation complete.
                }); 
                error = true; // change the error state to true
            }

            var subject = this.$contactFormSubject.val(); // get the value of the input field
            if(subject == "" || subject == " " || subject == "Subject") {
                this.$errorSubject.show(500);
                this.$errorSubject.delay(4000);
                this.$errorSubject.animate({
                    height: 'toggle'  
                }, 500, function() {
                    // Animation complete.
                }); 
                error = true; // change the error state to true
            }


            var email_compare = /^([a-z0-9_.-]+)@([da-z.-]+).([a-z.]{2,6})$/; // Syntax to compare against input
            var email = this.$contactFormEmail.val().toLowerCase(); // get the value of the input field

            if (email == "" || email == " " || email == "E-mail") { // check if the field is empty
                this.$errorEmail.show(500);
                this.$errorEmail.delay(4000);
                this.$errorEmail.animate({
                    height: 'toggle'  
                }, 500, function() {
                    // Animation complete.
                });         
                error = true;
            }
            else if (!email_compare.test(email)) { // if it's not empty check the format against our email_compare variable
                this.$errorEmail.show(500);
                this.$errorEmail.delay(4000);
                this.$errorEmail.animate({
                    height: 'toggle'  
                }, 500, function() {
                    // Animation complete.
                });         
                error = true;
            }

            var message = this.$contactFormMessage.val(); // get the value of the input field
            
            if(message == "" || message == " " || message == "Message") {              
                this.$errorMessage.show(500);
                this.$errorMessage.delay(4000);
                this.$errorMessage.animate({
                    height: 'toggle'  
                }, 500, function() {
                    // Animation complete.
                });            
                error = true; // change the error state to true
            }

            if(error == true) {
                this.$errorForm.show(500);
                this.$errorForm.delay(4000);
                this.$errorForm.animate({
                    height: 'toggle'  
                }, 500, function() {
                    // Animation complete.
                }); 
            }

            return error;
        },
        //contact form submit handler
        contactFormSubmit: function (obj) {
            this.$errorMessages.fadeOut('slow'); // reset the error messages (hides them)

            if(this.validate() == false) {

                var data_string = $('#ajax-form').serialize(); // Collect data from form

                var $this = this;
                $.ajax({
                    type: "POST",
                    url: $this.$contactForm.attr('action'),
                    data: data_string,
                    timeout: 6000,
                    cache: false,
                    crossDomain: false,
                    error: function(request,error) {
                        if (error == "timeout") {
                            $this.$errorTimeout.slideDown('slow');
                        }
                        else {
                            $this.$errorState.slideDown('slow');
                            $this.$errorState.html('An error occurred: ' + error + '');
                        }
                    },
                    success: function() {
                        $this.$confirmMessage.show(500);
                        $this.$confirmMessage.delay(4000);
                        $this.$confirmMessage.animate({
                            height: 'toggle'  
                            }, 500, function() {
                        });    
                        
                        $this.$contactFormName.val('');
                        $this.$contactFormEmail.val('');
                        $this.$contactFormMessage.val('');
                        $this.$contactFormSubject.val('');
                    }
                });
            }
            return false;
        },
        bindEvents: function () {
            //binding submit event
            this.$contactFormBtn.on('click', this.contactFormSubmit.bind(this));
        },
        init: function () {
            //initializing the contact form
            console.log('Contact form is initialized');
            this.bindEvents();
            return this;
        }
    };

    //Initializing the app
    ContactFormApp.init({});

});


/*======================================================
    7).Background
========================================================*/
    function initPageBackground() {
      if($('body').hasClass('image-background')) { // IMAGE BACKGROUND

        $("body").backstretch("images/bg1.jpg");

      } else if( $('body').hasClass('slideshow-background') ) { // SLIDESHOW BACKGROUND

        $("body").backstretch([
          "images/bg1.jpg",
          "images/bg2.jpg",
          "images/bg3.jpg",
          "images/bg4.jpg",
          "images/bg5.jpg"
        ], {duration: 3000, fade: 1200});
      } 
    }

    initPageBackground();

/*======================================================
    8).Full height function start 
========================================================*/
    var setHeight = function () {
        var height = $(window).height();
        $('.full-screen').css('height', (height));
    };

});
