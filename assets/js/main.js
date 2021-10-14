wow = new WOW({
    animateClass: 'animated',
    offset: 120
});
var scrolled = false;
$(window).on('scroll', function () {
    if (!scrolled) {
        scrolled = true;
        wow.init();
    }
});
(function ($) {
    "use strict";

    var themesFlat = {

        // Main init function
        init: function () {
            this.config();
            this.events();
        },

        // Define vars for caching
        config: function () {
            this.config = {
                $window: $(window),
                $document: $(document),
            };
        },

        // Events
        events: function () {
            var self = this;

            // Run on document ready
            self.config.$document.on('ready', function () {

                // Header Fixed
                self.headerFixed();

                // Cart Icon
                self.cartIcon();

                // Mobile Navigation
                self.mobileNav();

                // Retina Logos
                self.retinaLogo();

                // Responsive Videos
                self.responsiveVideos();

                // Spacer
                self.widgetSpacer();

                // Mega menu
                self.megaMenu();

                // Scroll to Top
                self.scrollToTop();

                // PreLoader
                self.preLoader();
            });

            // Run on Window Load
            self.config.$window.on('load', function () {

            });
        },

        // Mega Menu
        megaMenu: function () {
            $(window).on('load resize', function () {
                var
                    du = $('#main-nav .megamenu > ul'),
                    siteNav = $('#main-nav'),
                    siteHeader = $('#site-header');

                if (du.length) {
                    var
                        o = siteHeader.find(".themesflat-container").outerWidth(),
                        a = siteNav.outerWidth(),
                        n = siteNav.css("right"),
                        n = parseInt(n, 10),
                        d = o - a - n;
                    if ($('.site-navigation-wrap').length) d = 0;
                    du.css({
                        width: o,
                        "margin-left": -d
                    })
                }
            });
        },

        // PreLoader
        preLoader: function () {
            if ($().animsition) {
                $('.animsition').animsition({
                    inClass: 'fade-in',
                    outClass: 'fade-out',
                    inDuration: 1500,
                    outDuration: 800,
                    loading: true,
                    loadingParentElement: 'body',
                    loadingClass: 'animsition-loading',
                    timeout: false,
                    timeoutCountdown: 5000,
                    onLoadEvent: true,
                    browser: [
                        '-webkit-animation-duration',
                        '-moz-animation-duration',
                        'animation-duration'
                    ],
                    overlay: false,
                    overlayClass: 'animsition-overlay-slide',
                    overlayParentElement: 'body',
                    transition: function (url) {
                        window.location.href = url;
                    }
                });
            }
        },

        // Menu Cart Icon
        cartIcon: function () {
            $(document).on('woocommerce-cart-changed', function (e, data) {
                if (parseInt(data.items_count, 10) > 0) {
                    $('.shopping-cart-items-count')
                        .text(data.items_count)
                }
            });
        },

        // Mobile Navigation
        mobileNav: function () {
            var menuType = 'desktop';

            $(window).on('load resize', function () {
                var mode = 'desktop';
                var wrapMenu = $('#site-header-inner .wrap-inner');
                var navExtw = $('.nav-extend.active');
                var navExt = $('.nav-extend.active').children();

                if (matchMedia('only screen and (max-width: 991px)').matches)
                    mode = 'mobile';

                if (mode != menuType) {
                    menuType = mode;

                    if (mode === 'mobile') {
                        $('#main-nav').attr('id', 'main-nav-mobi')
                            .appendTo('#site-header')
                            .hide().children('.menu').append(navExt)
                            .find('li:has(ul)')
                            .children('ul')
                            .removeAttr('style')
                            .hide()
                            .before('<span class="arrow"></span>');
                    } else {
                        if ($('body').is('.header-style-3'))
                            wrapMenu = $('.site-navigation-wrap .inner');

                        $('#main-nav-mobi').attr('id', 'main-nav')
                            .removeAttr('style')
                            .prependTo(wrapMenu)
                            .find('.ext').appendTo(navExtw)
                            .parent().siblings('#main-nav')
                            .find('.sub-menu')
                            .removeAttr('style')
                            .prev().remove();

                        $('.mobile-button').removeClass('active');
                    }
                }
            });

            $(document).on('click', '.mobile-button', function () {
                $(this).toggleClass('active');
                $('#main-nav-mobi').slideToggle();
            })

            $(document).on('click', '#main-nav-mobi .arrow', function () {
                $(this).toggleClass('active').next().slideToggle();
            })
        },

        // Retina Logos
        retinaLogo: function () {
            var retina = window.devicePixelRatio > 1 ? true : false;
            var $logo = $('#site-logo img');
            var $logo_retina = $logo.data('retina');

            if (retina && $logo_retina) {
                $logo.attr({
                    src: $logo.data('retina'),
                    width: $logo.data('width'),
                    height: $logo.data('height')
                });
            }
        },

        // Responsive Videos
        responsiveVideos: function () {
            if ($().fitVids) {
                $('.themesflat-container').fitVids();
            }
        },

        // Header Fixed
        headerFixed: function () {
            if ($('body').hasClass('header-fixed')) {
                var nav = $('#site-header');

                if ($('body').is('.header-style-8')) {
                    var nav = $('.site-navigation-wrap');
                }

                if (nav.length) {
                    var offsetTop = nav.offset().top,
                        headerHeight = nav.height(),
                        injectSpace = $('<div />', {
                            height: headerHeight
                        }).insertAfter(nav);

                    $(window).on('load scroll', function () {
                        if ($(window).scrollTop() > offsetTop) {
                            nav.addClass('is-fixed');
                            injectSpace.show();
                        } else {
                            nav.removeClass('is-fixed');
                            injectSpace.hide();
                        }

                        if ($(window).scrollTop() > 300) {
                            nav.addClass('is-small');
                        } else {
                            nav.removeClass('is-small');
                        }
                    })
                }
            }
        },

        // Scroll to Top
        scrollToTop: function () {
            $(window).scroll(function () {
                if ($(this).scrollTop() > 800) {
                    $('#scroll-top').addClass('show');
                } else {
                    $('#scroll-top').removeClass('show');
                }
            });

            $('#scroll-top').on('click', function () {
                $('html, body').animate({
                    scrollTop: 0
                }, 1000, 'easeInOutExpo');
                return false;
            });

            $('.btn-anchor').on('click', function () {
                var anchor = $(this).attr('href').split('#')[1];

                $(this).parent()
                    .addClass('current-menu-item')
                    .siblings()
                    .removeClass('current-menu-item');

                if (anchor) {
                    if ($('#' + anchor).length > 0) {
                        var headerHeight = 0;

                        if ($('body').hasClass('header_sticky')) {
                            headerHeight = $('#site-header').height();
                            var target = $('#' + anchor).offset().top + 39 - headerHeight;
                            if (matchMedia('only screen and (max-width: 991px)').matches) {
                                var target = $('#' + anchor).offset().top + 10 - headerHeight;
                                console.log(target);
                            }

                            $('html,body').animate({
                                scrollTop: target
                            }, 2000, 'easeInOutExpo');
                        }
                    }
                }
                return false;
            });
        },

        // Widget Spacer
        widgetSpacer: function () {
            $(window).on('load resize', function () {
                var mode = 'desktop';

                if (matchMedia('only screen and (max-width: 991px)').matches)
                    mode = 'mobile';

                $('.spacer').each(function () {
                    if (mode === 'mobile') {
                        $(this).attr('style', 'height:' + $(this).data('mobi') + 'px')
                    } else {
                        $(this).attr('style', 'height:' + $(this).data('desktop') + 'px')
                    }
                })
            });
        },

    }; // end themesFlat

    // Start things up
    themesFlat.init();

    // function calculateInvestment() {
    //     var investAmt = document.getElementById("formGroupExampleInput").value;
    //     var investYr = document.getElementById("investment-select").value;
    //     console.log(investYr);
    //     var interestRate = 0;
    //     var interestRate15 = 15;
    //     var interestRate20 = 20;
    //     var interestRate20 = 25;
    //     var interestRate30 = 30;
    //     var interestRate40 = 40;
    //     var interestRate50 = 50;
    //     var interestRate60 = 60;
    //     var profit1 = 0;
    //     var profit2 = 0;
    //     var profit3 = 0;
    //     var profit4 = 0;
    //     var profit5 = 0;
    //     var subtitle = "";
    //     if (investAmt == 100) {
    //         console.log("100-1000");
    //         subtitle = "€100-€1000";
    //         if (investYr == 6) {
    //             interestRate = 10;
    //         } else if (investYr == 12) {
    //             interestRate = 20;
    //         } else if (investYr == 18) {
    //             interestRate = 30;
    //         } else if (investYr == 24) {
    //             interestRate = 40;
    //         } else if (investYr == 36) {
    //             interestRate = 60;
    //         }
    //         profit1 = 10;
    //         profit2 = 20;
    //         profit3 = 30;
    //         profit4 = 40;
    //         profit5 = 60;

    //     } else if (investAmt == 1001) {
    //         console.log("1001-5000");
    //         subtitle = "€1001-€5000";
    //         if (investYr == 6) {
    //             interestRate = 15;
    //         } else if (investYr == 12) {
    //             interestRate = 30;
    //         } else if (investYr == 18) {
    //             interestRate = 45;
    //         } else if (investYr == 24) {
    //             interestRate = 60;
    //         } else if (investYr == 36) {
    //             interestRate = 90;
    //         }
    //         profit1 = 15;
    //         profit2 = 30;
    //         profit3 = 45;
    //         profit4 = 60;
    //         profit5 = 90;
    //     } else if (investAmt == 5001) {
    //         console.log("5001-10000");
    //         subtitle = "€5001-€10000";
    //         if (investYr == 6) {
    //             interestRate = 20;
    //         } else if (investYr == 12) {
    //             interestRate = 40;
    //         } else if (investYr == 18) {
    //             interestRate = 60;
    //         } else if (investYr == 24) {
    //             interestRate = 80;
    //         } else if (investYr == 36) {
    //             interestRate = 120;
    //         }
    //         profit1 = 20;
    //         profit2 = 40;
    //         profit3 = 60;
    //         profit4 = 80;
    //         profit5 = 120;
    //     } else if (investAmt == 10001) {
    //         console.log("10001-25000");
    //         subtitle = "€10001-€25000";
    //         if (investYr == 6) {
    //             interestRate = 25;
    //         } else if (investYr == 12) {
    //             interestRate = 50;
    //         } else if (investYr == 18) {
    //             interestRate = 75;
    //         } else if (investYr == 24) {
    //             interestRate = 100;
    //         } else if (investYr == 36) {
    //             interestRate = 150;
    //         }
    //         profit1 = 25;
    //         profit2 = 50;
    //         profit3 = 75;
    //         profit4 = 100;
    //         profit5 = 150;
    //     } else if (investAmt == 25001) {
    //         console.log("25001-call");
    //         subtitle = "€25001-call";
    //         if (investYr == 6) {
    //             interestRate = 30;
    //         } else if (investYr == 12) {
    //             interestRate = 60;
    //         } else if (investYr == 18) {
    //             interestRate = 90;
    //         } else if (investYr == 24) {
    //             interestRate = 120;
    //         } else if (investYr == 36) {
    //             interestRate = 180;
    //         }
    //         profit1 = 30;
    //         profit2 = 60;
    //         profit3 = 90;
    //         profit4 = 120;
    //         profit5 = 180;
    //     } else {
    //         interestRate = 1;
    //     }
    //     console.log(interestRate);
    //     document.getElementById("yield").innerHTML = interestRate;
        
    //     if (investAmt === "" || investYr == 0) {
    //         alert("Please enter values");
    //         return;
    //     }

       
    //     if (interestRate === "" || interestRate <= 1) {
    //         interestRate = 1;
    //         document.getElementById("yieldamount").style.display = "inline";
    //     } else {
    //         document.getElementById("yieldamount").style.display = "inline";
    //     }

       
    //     document.getElementById("investyield").style.display = "block";
       
       
        
    //     $("#investTableHolder").empty();
    //     $("#investTableHolder").append('<table class="table table-bordered table-hover"></table>');
    //     let table = $('#investTableHolder').children();
    //     if (investYr == 6) {
    //         table.append('<thead><tr><th style="width: 40%;">Investment</th><th style="width: 60%;">6 months</th></tr></thead>');
    //         table.append('<tr><td>€100 - €1000</td><td><div class="skill"><h3>PROFIT</h3><div class="skill-bar skill1 wow slideInLeft" data-wow-duration="3s"><span class="skill-count1">10%</span></div></div></td></tr>');
    //         table.append('<tr><td>€1001 - €5000</td><td><div class="skill"><h3>PROFIT</h3><div class="skill-bar skill2 wow slideInLeft" data-wow-duration="3s"><span class="skill-count2">15%</span></div></div></td></tr>');
    //         table.append('<tr><td>€5001 - €10000</td><td><div class="skill"><h3>PROFIT</h3><div class="skill-bar skill3 wow slideInLeft" data-wow-duration="3s"><span class="skill-count3">20%</span></div></div></td></tr>');
    //         table.append('<tr><td>€10001 - €25000</td><td><div class="skill"><h3>PROFIT</h3><div class="skill-bar skill4 wow slideInLeft" data-wow-duration="3s"><span class="skill-count4">25%</span></div></div></td></tr>');
    //         table.append('<tr><td>€25001 - call</td><td><div class="skill"><h3>PROFIT</h3><div class="skill-bar skill5 wow slideInLeft" data-wow-duration="3s"><span class="skill-count5">30%</span></div></div></td></tr>');
    //         $('.skill-bar').css({
    //             "animation": "slideInLeft 3s"
    //         });
    //     } else if (investYr == 12) {
    //         table.append('<thead><tr><th style="width: 40%;">Investment</th><th style="width: 60%;">12 months</th></tr></thead>');
    //         table.append('<tr><td>€100 - €1000</td><td><div class="skill"><h3>PROFIT</h3><div class="skill-bar skill1 wow slideInLeft" data-wow-duration="3s"><span class="skill-count1">20%</span></div></div></td></tr>');
    //         table.append('<tr><td>€1001 - €5000</td><td><div class="skill"><h3>PROFIT</h3><div class="skill-bar skill2 wow slideInLeft" data-wow-duration="3s"><span class="skill-count2">30%</span></div></div></td></tr>');
    //         table.append('<tr><td>€5001 - €10000</td><td><div class="skill"><h3>PROFIT</h3><div class="skill-bar skill3 wow slideInLeft" data-wow-duration="3s"><span class="skill-count3">40%</span></div></div></td></tr>');
    //         table.append('<tr><td>€10001 - €25000</td><td><div class="skill"><h3>PROFIT</h3><div class="skill-bar skill4 wow slideInLeft" data-wow-duration="3s"><span class="skill-count4">500%</span></div></div></td></tr>');
    //         table.append('<tr><td>€25001 - call</td><td><div class="skill"><h3>PROFIT</h3><div class="skill-bar skill5 wow slideInLeft" data-wow-duration="3s"><span class="skill-count5">60%</span></div></div></td></tr>');
    //         $('.skill-bar').css({
    //             "animation": "slideInLeft 3s"
    //         });
    //     } else if (investYr == 18) {
    //         table.append('<thead><tr><th style="width: 40%;">Investment</th><th style="width: 60%;">18 months</th></tr></thead>');
    //         table.append('<tr><td>€100 - €1000</td><td><div class="skill"><h3>PROFIT</h3><div class="skill-bar skill1 wow slideInLeft" data-wow-duration="3s"><span class="skill-count1">30%</span></div></div></td></tr>');
    //         table.append('<tr><td>€1001 - €5000</td><td><div class="skill"><h3>PROFIT</h3><div class="skill-bar skill2 wow slideInLeft" data-wow-duration="3s"><span class="skill-count2">45%</span></div></div></td></tr>');
    //         table.append('<tr><td>€5001 - €10000</td><td><div class="skill"><h3>PROFIT</h3><div class="skill-bar skill3 wow slideInLeft" data-wow-duration="3s"><span class="skill-count3">60%</span></div></div></td></tr>');
    //         table.append('<tr><td>€10001 - €25000</td><td><div class="skill"><h3>PROFIT</h3><div class="skill-bar skill4 wow slideInLeft" data-wow-duration="3s"><span class="skill-count4">75%</span></div></div></td></tr>');
    //         table.append('<tr><td>€25001 - call</td><td><div class="skill"><h3>PROFIT</h3><div class="skill-bar skill5 wow slideInLeft" data-wow-duration="3s"><span class="skill-count5">90%</span></div></div></td></tr>');
    //         $('.skill-bar').css({
    //             "animation": "slideInLeft 3s"
    //         });
    //     } else if (investYr == 24) {
    //         table.append('<thead><tr><th style="width: 40%;">Investment</th><th style="width: 60%;">24 months</th></tr></thead>');
    //         table.append('<tr><td>€100 - €1000</td><td><div class="skill"><h3>PROFIT</h3><div class="skill-bar skill1 wow slideInLeft" data-wow-duration="3s"><span class="skill-count1">40%</span></div></div></td></tr>');
    //         table.append('<tr><td>€1001 - €5000</td><td><div class="skill"><h3>PROFIT</h3><div class="skill-bar skill2 wow slideInLeft" data-wow-duration="3s"><span class="skill-count2">60%</span></div></div></td></tr>');
    //         table.append('<tr><td>€5001 - €10000</td><td><div class="skill"><h3>PROFIT</h3><div class="skill-bar skill3 wow slideInLeft" data-wow-duration="3s"><span class="skill-count3">80%</span></div></div></td></tr>');
    //         table.append('<tr><td>€10001 - €25000</td><td><div class="skill"><h3>PROFIT</h3><div class="skill-bar skill4 wow slideInLeft" data-wow-duration="3s"><span class="skill-count4">100%</span></div></div></td></tr>');
    //         table.append('<tr><td>€25001 - call</td><td><div class="skill"><h3>PROFIT</h3><div class="skill-bar skill5 wow slideInLeft" data-wow-duration="3s"><span class="skill-count5">120%</span></div></div></td></tr>');
    //         $('.skill-bar').css({
    //             "animation": "slideInLeft 3s"
    //         });
    //     } else if (investYr == 36) {
    //         table.append('<thead><tr><th style="width: 40%;">Investment</th><th style="width: 60%;">36 months</th></tr></thead>');
    //         table.append('<tr><td>€100 - €1000</td><td><div class="skill"><h3>PROFIT</h3><div class="skill-bar skill1 wow slideInLeft" data-wow-duration="3s"><span class="skill-count1">60%</span></div></div></td></tr>');
    //         table.append('<tr><td>€1001 - €5000</td><td><div class="skill"><h3>PROFIT</h3><div class="skill-bar skill2 wow slideInLeft" data-wow-duration="3s"><span class="skill-count2">90%</span></div></div></td></tr>');
    //         table.append('<tr><td>€5001 - €10000</td><td><div class="skill"><h3>PROFIT</h3><div class="skill-bar skill3 wow slideInLeft" data-wow-duration="3s"><span class="skill-count3">120%</span></div></div></td></tr>');
    //         table.append('<tr><td>€10001 - €25000</td><td><div class="skill"><h3>PROFIT</h3><div class="skill-bar skill4 wow slideInLeft" data-wow-duration="3s"><span class="skill-count4">150%</span></div></div></td></tr>');
    //         table.append('<tr><td>€25001 - call</td><td><div class="skill"><h3>PROFIT</h3><div class="skill-bar skill5 wow slideInLeft" data-wow-duration="3s"><span class="skill-count5">180%</span></div></div></td></tr>');
    //         $('.skill-bar').css({
    //             "animation": "slideInLeft 3s"
    //         });
    //     }
    //     Highcharts.chart('containerChart', {
    //         chart: {
    //             type: 'column',
                
    //         },
    //         title: {
    //             text: 'Percentage of Profit Over Time'
    //         },
    //         subtitle: {
    //             text: subtitle
    //         },
    //         xAxis: {
    //             categories: ['6 months', '12 months', '18 months', '24 months', '36 months']
    //         },
    //         yAxis: {
    //             min: 0,
    //             gridLineWidth: .5,
    //             gridLineDashStyle: 'dash',
    //             gridLineColor: '#def0fb',
    //             title: {
    //                 text: '',
    //                 style: {
    //                     color: '#fff'
    //                 }
    //             },
    //             stackLabels: {
    //                 enabled: true,
    //                 style: {
    //                     fontWeight: 'normal',
    //                     color: ( // theme
    //                         Highcharts.defaultOptions.title.style &&
    //                         Highcharts.defaultOptions.title.style.color
    //                     ) || 'gray'
    //                 }
    //             }
    //         },
    //         legend: {
    //             enabled: true,
                
    //         },
    //         credits: {
    //             enabled: false
    //         },
    //         tooltip: {
    //             headerFormat: '<b>{point.x}</b><br/>',
    //             pointFormat: '{series.name}: {point.y}%<br/>Total: {point.stackTotal}%'
    //         },
    //         plotOptions: {
    //             column: {
    //                 stacking: 'normal',
    //                 dataLabels: {
    //                     enabled: false
    //                 }
    //             },
    //             series: {
    //                 pointWidth: 25,
    //                 groupPadding: 0,
    //                 pointPadding: 0.3,
    //                 borderWidth: 0

    //             }

    //         },
    //         series: [{
    //             name: 'Profit',
    //             data: [profit1, profit2, profit3, profit4, profit5],
    //             color: '#FFD031'
    //         }, {
    //             name: 'Investment',
    //             data: [100, 100, 100, 100, 100],
    //             color: '#39C0FB'
    //         }],
    //         exporting: {
    //             enabled: false
    //         }
    //     });
    // }
    //start radial chart
    // Highcharts.chart('radialChart', {
    //     colors: ['#FFD700', '#C0C0C0', '#CD7F32'],
    //     chart: {
    //         type: 'column',
    //         inverted: true,
    //         polar: true
    //     },
    //     title: {
    //         text: ''
    //     },
    //     tooltip: {
    //         outside: true
    //     },
    //     credits: {
    //         enabled: false
    //     },
    //     exporting: {
    //         enabled: false
    //     },
    //     panel: {
    //         size: '65%',
    //         innerSize: '10%',
    //         endAngle: 270
    //     },
    //     xAxis: {
    //         tickInterval: 1,
    //         labels: {
    //             align: 'right',
    //             useHTML: true,
    //             allowOverlap: true,
    //             step: 1,
    //             y: 3,
    //             style: {
    //                 fontSize: '13px'
    //             }
    //         },
    //         lineWidth: 0,
    //         categories: [
    //             '6 months'
    //         ]
    //     },
    //     yAxis: {
    //         crosshair: {
    //             enabled: true,
    //             color: '#333'
    //         },
    //         lineWidth: 0,
    //         tickInterval: 200,
    //         reversedStacks: false,
    //         endOnTick: true,
    //         showLastLabel: true
    //     },

    //     plotOptions: {
    //         column: {
    //             stacking: 'normal',
    //             borderWidth: 0,
    //             pointPadding: 0,
    //             groupPadding: 0.15
    //         }
    //     },
    //     series: [{
    //         name: 'Starting Amount',
    //         data: [1000],
    //         color: '#39C0FB'

    //     }, {
    //         name: 'Return',
    //         data: [800],
    //         color: '#90EE7E'
    //     }]
    // });

   
    // document.getElementById("investyield").style.display = "none";
    // document.getElementById("yieldamount").style.display = "none";

   
    // document.getElementById("calculate").onclick = function () {
    //     calculateInvestment();
    // };
    // $('#calculate').trigger('click');
    
    const openSerbian = () => {
        window.location = "index-sr.html";
    }
    const openEnglish = () => {
        window.location = "index.html";
    }
    $(".srlink").click(function () {
        openSerbian();
    });
    $(".enlink").click(function () {
        openEnglish();
    });
})(jQuery);
const link = document.getElementById('videolink');
const imagelink = document.getElementById('imagelink');
const showClass = "bg-show";
const bg = $(".bg");
const hoverImg8 = document.getElementById("spot8");
const hoverImg10 = document.getElementById("spot10");
const hoverImg11 = document.getElementById("spot11");
const hoverImg12 = document.getElementById("spot12");
const hoverImg1 = document.getElementById("spot1");
const hoverImg2 = document.getElementById("spot2");
const hoverImg3 = document.getElementById("spot3");
const hoverImg4 = document.getElementById("spot4");
const hoverImg5 = document.getElementById("spot5");
const hoverImg6 = document.getElementById("spot6");
const hoverImg7 = document.getElementById("spot7");
jQuery(document).ready(function ($) {
    jQuery.ajax({
        type: 'GET',
        url: 'https://explorer.tsf-platform.com/api/v1/network/stats',
        dataType: 'json',
        success: function (response) {
            var tsfblock = response[0].number;
            console.log(tsfblock);
            var tsfminer = response[0].miner;
            var tsfdiff = response[0].difficultyFormated;
            var tsfhashrate = response[0].hashrate;
            var tsfsupply = response[0].circulatingSupply;
            console.log(tsfsupply);
            jQuery("#latest_block").html(tsfblock);
            // jQuery("#miner").html(tsfminer);
            // jQuery("#block_diff").html(tsfdiff + " T");
            jQuery("#hashrate").html(tsfhashrate + " GH");
            jQuery("#supply").html(tsfsupply + " TSF");
        },
        error: function (jqXHR, textStatus) {
            console.log(textStatus);
        }
    });
    setInterval(function () {
        jQuery.ajax({
            type: 'GET',
            url: 'https://explorer.tsf-platform.com/api/v1/network/stats',
            dataType: 'json',
            success: function (response) {
                var tsfblock = response[0].number;
                console.log(tsfblock);
                var tsfminer = response[0].miner;
                var tsfdiff = response[0].difficultyFormated;
                var tsfhashrate = response[0].hashrate;
                var tsfsupply = response[0].circulatingSupply;
                jQuery("#latest_block").html(tsfblock);
                // jQuery("#miner").html(tsfminer);
                // jQuery("#block_diff").html(tsfdiff + " T");
                jQuery("#hashrate").html(tsfhashrate + " GH");
                jQuery("#supply").html(tsfsupply + " TSF");
            },
            error: function (jqXHR, textStatus) {
                console.log(textStatus);
            }
        });
    }, 5000);

    // jQuery.ajax({
    //     type: 'GET',
    //     url: 'https://explorer.tsf-platform.com/api/v1/address/totalAddr/all',
    //     dataType: 'json',
    //     success: function (response) {
    //         let totalAddr = parseInt(response.totalAddr);
    //         console.log(totalAddr);
    //         // jQuery("#totalAddrCounter").html(totalAddr);

    //         // var tsfblock = response[0].number;
    //         // var tsfminer = response[0].miner;
    //         // var tsfdiff = response[0].difficultyFormated;
    //         // var tsfhashrate = response[0].hashrate;
    //         // var tsfsupply = response[0].circulatingSupply;
    //         // jQuery("#latest_block").html(tsfblock);
    //         // jQuery("#miner").html(tsfminer);
    //         // jQuery("#block_diff").html(tsfdiff + " T");
    //         // jQuery("#hashrate").html(tsfhashrate + " GH");
    //         // jQuery("#supply").html(tsfsupply + " TSF");
    //     },
    //     error: function (jqXHR, textStatus) {
    //         console.log(textStatus);
    //     }
    // });

    jQuery.ajax({
        type: 'GET',
        url: 'https://api.coingecko.com/api/v3/coins/teslafunds',
        dataType: 'json',
        success: function (response1) {
            console.log(response1);
            var market_cap_rank = response1.market_data.market_cap_rank;
            console.log(market_cap_rank);
            var total_volume = response1.market_data.total_volume.usd;
            console.log(total_volume);
            var current_price = response1.market_data.current_price.usd;
            console.log(current_price);
            var market_cap = response1.market_data.market_cap.usd;
            console.log(market_cap);
            var high_24h = response1.market_data.high_24h.usd;
            console.log(high_24h);
            var low_24h = response1.market_data.low_24h.usd;
            console.log(low_24h);
            var price_change_percentage_24h = response1.market_data.price_change_percentage_24h;
            console.log(price_change_percentage_24h);
            // jQuery("#market_cap_rank").html(market_cap_rank);
            // jQuery("#total_volume").html("$ " + total_volume);
            jQuery("#current_price").html("$ " + current_price);
            jQuery("#market_cap").html("$ " + market_cap);
            // jQuery("#high_24h").html("$ " + high_24h + " / ");
            // jQuery("#low_24h").html("$ " + low_24h);
            // jQuery("#price_change_percentage_24h").html("( " + price_change_percentage_24h + " % )");
            console.log(response1.tickers[0]);
            console.log(response1.tickers[0].base);
        },
        error: function (jqXHR, textStatus) {
            console.log(textStatus);
        }
    });
});
// link.addEventListener("mouseenter", function () {
//     $(".bg").append('<video src="assets/video/snimakdrona.mp4" id="videoid" autoplay loop muted></video>');
//     document.body.classList.add(showClass);
//     $("#site-header").addClass("hidden");
// });

// link.addEventListener("mouseleave", () => {
//     document.body.classList.remove(showClass);
//     $("#videoid").remove();
//     $("#site-header").removeClass("hidden");
// });
// imagelink.addEventListener("mouseenter", function () {
//     $(".bg").append('<img src="assets/img/fullgallery.jpg" id="fullimg">');
//     document.body.classList.add(showClass);
//     $("#site-header").addClass("hidden");
// });

// imagelink.addEventListener("mouseleave", function () {
//     document.body.classList.remove(showClass);
//     $("#fullimg").remove();
//     $("#site-header").removeClass("hidden");
// });
// hoverImg8.addEventListener("mouseenter", function () {
//     $("#light8").addClass("hidden");
//     $("#dark8").removeClass("hidden").addClass("block");
// });
// hoverImg8.addEventListener("mouseleave", function () {
//     $("#light8").removeClass("hidden");
//     $("#dark8").removeClass("block").addClass("hidden");
// });
// hoverImg10.addEventListener("mouseenter", function () {
//     $("#light10").addClass("hidden");
//     $("#dark10").removeClass("hidden").addClass("block");
// });
// hoverImg10.addEventListener("mouseleave", function () {
//     $("#light10").removeClass("hidden");
//     $("#dark10").removeClass("block").addClass("hidden");
// });
// hoverImg11.addEventListener("mouseenter", function () {
//     $("#light11").addClass("hidden");
//     $("#dark11").removeClass("hidden").addClass("block");
// });
// hoverImg11.addEventListener("mouseleave", function () {
//     $("#light11").removeClass("hidden");
//     $("#dark11").removeClass("block").addClass("hidden");
// });
// hoverImg12.addEventListener("mouseenter", function () {
//     $("#light12").addClass("hidden");
//     $("#dark12").removeClass("hidden").addClass("block");
// });
// hoverImg12.addEventListener("mouseleave", function () {
//     $("#light12").removeClass("hidden");
//     $("#dark12").removeClass("block").addClass("hidden");
// });
// hoverImg1.addEventListener("mouseenter", function () {
//     $("#light1").addClass("hidden");
//     $("#dark1").removeClass("hidden").addClass("block");
// });
// hoverImg1.addEventListener("mouseleave", function () {
//     $("#light1").removeClass("hidden");
//     $("#dark1").removeClass("block").addClass("hidden");
// });
// hoverImg2.addEventListener("mouseenter", function () {
//     $("#light2").addClass("hidden");
//     $("#dark2").removeClass("hidden").addClass("block");
// });
// hoverImg2.addEventListener("mouseleave", function () {
//     $("#light2").removeClass("hidden");
//     $("#dark2").removeClass("block").addClass("hidden");
// });
// hoverImg3.addEventListener("mouseenter", function () {
//     $("#light3").addClass("hidden");
//     $("#dark3").removeClass("hidden").addClass("block");
// });
// hoverImg3.addEventListener("mouseleave", function () {
//     $("#light3").removeClass("hidden");
//     $("#dark3").removeClass("block").addClass("hidden");
// });
// hoverImg4.addEventListener("mouseenter", function () {
//     $("#light4").addClass("hidden");
//     $("#dark4").removeClass("hidden").addClass("block");
// });
// hoverImg4.addEventListener("mouseleave", function () {
//     $("#light4").removeClass("hidden");
//     $("#dark4").removeClass("block").addClass("hidden");
// });
// hoverImg5.addEventListener("mouseenter", function () {
//     $("#light5").addClass("hidden");
//     $("#dark5").removeClass("hidden").addClass("block");
// });
// hoverImg5.addEventListener("mouseleave", function () {
//     $("#light5").removeClass("hidden");
//     $("#dark5").removeClass("block").addClass("hidden");
// });
// hoverImg6.addEventListener("mouseenter", function () {
//     $("#light6").addClass("hidden");
//     $("#dark6").removeClass("hidden").addClass("block");
// });
// hoverImg6.addEventListener("mouseleave", function () {
//     $("#light6").removeClass("hidden");
//     $("#dark6").removeClass("block").addClass("hidden");
// });
// hoverImg7.addEventListener("mouseenter", function () {
//     $("#light7").addClass("hidden");
//     $("#dark7").removeClass("hidden").addClass("block");
// });
// hoverImg7.addEventListener("mouseleave", function () {
//     $("#light7").removeClass("hidden");
//     $("#dark7").removeClass("block").addClass("hidden");
// });

