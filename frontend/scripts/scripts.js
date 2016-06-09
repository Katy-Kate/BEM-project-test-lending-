(function () {
    var app = angular.module('myApp', ['slick', 'ngDialog']);

    app.controller('TabController', function ($scope, ngDialog) {
        this.tab = 1;

        this.setTab = function (tabId) {
            this.tab = tabId;
        };

        this.isSet = function (tabId) {
            return this.tab === tabId;
        };

        $scope.products = [
            {name : "awesome photo 1", src : 'images/img.jpg', category : "graphic", description : "Eum cu tantas legere complectitur, hinc utamu"},
            {name : "awesome photo 2", src : 'images/img.jpg', category : "web", description : "Eum cu tantas legere complectitur, hinc utamu"},
            {name : "awesome photo 3", src : 'images/img.jpg', category : "web", description : "Eum cu tantas legere complectitur, hinc utamu"},
            {name : "awesome photo 4", src : 'images/img.jpg', category : "web", description : "Eum cu tantas legere complectitur, hinc utamu"},
            {name : "awesome photo 5", src : 'images/img.jpg', category : "photo", description : "Eum cu tantas legere complectitur, hinc utamu"},
            {name : "awesome photo 6", src : 'images/img.jpg', category : "photo", description : "Eum cu tantas legere complectitur, hinc utamu"},
            {name : "awesome photo 7", src : 'images/img.jpg', category : "photo", description : "Eum cu tantas legere complectitur, hinc utamu"},
            {name : "awesome photo 8", src : 'images/img.jpg', category : "graphic", description : "Eum cu tantas legere complectitur, hinc utamu"},
            {name : "awesome photo 9", src : 'images/img.jpg', category : "graphic", description : "Eum cu tantas legere complectitur, hinc utamu"},
            {name : "awesome photo 10", src : 'images/img.jpg', category : "graphic", description : "Eum cu tantas legere complectitur, hinc utamu"}
        ];

        $scope.timelineData = [
            {data : "September 2014", title : "We Reach The Top", subtitle : "Kat is new brand", description : "Lorem ipsum dolor sit amet, rebum dolore labores cu pri. Ferri iudico scripta ut eam, diceret euismod gubergren has eu, an quo tale vivendum. Ad quidam gubergren vituperatoribus sit. Ius etiam nemore consulatu ne, at meliore explicari conceptam qui. Agam ceteros forensibus."},
            {data : "May 2014", title : "Close To The Stars", subtitle : "Big thing are happening", description : "Lorem ipsum dolor sit amet, rebum dolore labores cu pri. Ferri iudico scripta ut eam, diceret euismod gubergren has eu, an quo tale vivendum. Ad quidam gubergren vituperatoribus sit. Ius etiam nemore consulatu."},
            {data : "April 2012", title : "New Office", subtitle : "We are moving", description : "Lorem ipsum dolor sit amet, rebum dolore labores cu pri. Ferri iudico scripta ut eam, diceret euismod gubergren has eu, an quo tale vivendum."},
            {data : "March 2012", title : "Ket Is Live", subtitle : "Just started and feel so alive", description : "Lorem ipsum dolor sit amet, rebum dolore labores cu pri. Ferri iudico scripta ut eam, diceret euismod gubergren has eu, an quo tale vivendum. Ad quidam gubergren vituperatoribus sit. Ius etiam nemore consulatu ne, at meliore explicari conceptam qui. Agam ceteros forensibus vix eu, paulo ubique ex eam."}
        ];

        $scope.counters = [
            {value : '3054', description : "completed projects", icon: "images/icon-projects.png"},
            {value : '7 234 873', description : "click presed", icon: "images/icon-click.png"},
            {value : '4670', description : "mails sended and received", icon: "images/icon-mails.png"},
            {value : '939', description : "jokes tolds", icon: "images/icon-jokes.png"}
        ];
        $scope.filters = {};

        $scope.sort = function (value){
            $scope.filters.category = value;
        };
        $scope.clickToOpen = function (src) {
            ngDialog.open({ template: ' <div class="popup-wrap"><img  class="popup-img" src="'+ src +'" alt=""/></div>', className: 'ngdialog-theme-default', plain: true, width: '60%' });
        };

    });

    function isScrolledIntoView(elem,offset)
    {
        var $elem = $(elem);
        var $window = $(window);
        var docViewTop = $window.scrollTop();
        var docViewBottom = docViewTop + $window.height();
        var elemTop = $elem.offset().top;
        var elemBottom = elemTop + $elem.height() - offset;
        return ((elemBottom <= docViewBottom) && (elemTop >= docViewTop));
    }

    angular.element(document).ready(function() {

        var slickSettings = {
            centerMode: true,
            centerPadding: '150px',
            slidesToShow: 3,
            responsive: [
                {
                    breakpoint: 768,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 1
                    }
                },
                {
                    breakpoint: 480,
                    settings: {
                        arrows: false,
                        centerMode: true,
                        centerPadding: '40px',
                        slidesToShow: 1
                    }
                }
            ]
        };

        $( window ).resize(function(){
            if($(window).width() < 768) {
                $('#nav-tabs').addClass('mobilenav');
            }
            else {
                $('#nav-tabs').removeClass('mobilenav');
            }
        });
        $("#nav-tabs").find("a").click( function(){ // ����� ���� �� ������ � ������� go_to
            var scroll_el = $(this).attr('href'); // ������� ���������� �������� href, ������ ���� ����������, �.�. �������� ���������� � # ��� .
            if ($(scroll_el).length != 0) { // �������� ������������� �������� ����� �������� ������
                $('html, body').animate({ scrollTop: $(scroll_el).offset().top }, 500); // ��������� ��������� � �������� scroll_el
            }
            return false; // ��������� ����������� ��������
        });

        $('.center').slick(slickSettings);

        var navpos = $('#nav').offset();

        $(window).bind('scroll', function() {
            if ($(window).scrollTop() > navpos.top) {
                $('#nav').addClass('fixed');
            }
            else {
                $('#nav').removeClass('fixed');
            }

            $.each(['#home','#services', '#portf', '#contacts' ],function(key, val){
                    if (isScrolledIntoView(val,300)) {
                        var nav_id = '#' + $(val).attr('id');
                        $("#nav-tabs").find("a").removeClass("header__nav_item--active");//remove if something was selected
                        $('a[href="' + nav_id + '"]').addClass("header__nav_item--active");//add a selected class
                    }
                }

            );
            $( ".timeline__item" ).each(function() {
                if (isScrolledIntoView(this,0)) {
                    $(this).removeClass('hidden-elem');
                    $(this).addClass('visible-elem');
                }
                else {
                    $(this).addClass('hidden-elem');
                    $(this).removeClass('visible-elem');
                }
            });
        });

        $("#nav-tabs").find("a").click(function(){
            $("#nav-tabs").find("a").removeClass("header__nav_item--active");//remove if something was selected
            $(this).addClass("header__nav_item--active");//add a selected class
        });
        $(".portfolio__tabs").find("div").click(function(){
            $('.center').slick('unslick');
            $('.center').slick(slickSettings);
            $(".portfolio__tabs").find("div").removeClass("portfolio__tabs_item--active");//remove if something was selected
            $(this).addClass("portfolio__tabs_item--active");//add a selected class
        });

    });
})();