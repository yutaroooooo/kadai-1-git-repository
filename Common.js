$(document).ready(function() {
    // SVG 読み込み
    $.ajax({
    type: 'GET',
    url: '/js/svg.html',
    dataType: 'html',
    success: function(data){
      $('body').prepend(data);
      },
    error: function(XMLHttpRequest, textStatus, errorThrown) {
        $("body").html("XMLHttpRequest : " + XMLHttpRequest.status);
        $("body").html("textStatus : " + textStatus);
        $("body").html("errorThrown : " + errorThrown.message);
    }
    });

    var _ua = (function(u){
      return {
        Tablet:(u.indexOf("windows") != -1 && u.indexOf("touch") != -1 && u.indexOf("tablet pc") == -1)
          || u.indexOf("ipad") != -1
          || (u.indexOf("android") != -1 && u.indexOf("mobile") == -1)
          || (u.indexOf("firefox") != -1 && u.indexOf("tablet") != -1)
          || u.indexOf("kindle") != -1
          || u.indexOf("silk") != -1
          || u.indexOf("playbook") != -1,
        Mobile:(u.indexOf("windows") != -1 && u.indexOf("phone") != -1)
          || u.indexOf("iphone") != -1
          || u.indexOf("ipod") != -1
          || (u.indexOf("android") != -1 && u.indexOf("mobile") != -1)
          || (u.indexOf("firefox") != -1 && u.indexOf("mobile") != -1)
          || u.indexOf("blackberry") != -1
      }
    })(window.navigator.userAgent.toLowerCase());


    fixedNavi();

    function fixedNavi (){

        var $window = $(window), // Window オブジェクト
            $navi = $('#header'),   // ヘッダー

            // ヘッダーのクローン
            $naviClone = $navi.contents().clone(),

            // ヘッダーのクローンのコンテナー
            $naviCloneContainer = $('<div class="navi-clone"></div>'),

            // HTML の上辺からヘッダーの底辺までの距離 = ヘッダーのトップ位置 + ヘッダーの高さ
            threshold = $navi.offset().top + $navi.outerHeight() + 400;

        // コンテナーにヘッダーのクローンを挿入
        $naviCloneContainer.append($naviClone);

        // コンテナーを body の最後に挿入
        $naviCloneContainer.appendTo('#wrapper');

        $window.on('scroll', function () {
            if ($window.scrollTop() > threshold) {
                $naviCloneContainer.addClass('visible');
            } else {
                $naviCloneContainer.removeClass('visible');
            }
        });

        // $('body').bind('touchmove', function(){
        //     if ($window.scrollTop() > threshold) {
        //         $naviCloneContainer.addClass('visible');
        //     } else {
        //         $naviCloneContainer.removeClass('visible');
        //     }
        // });
        // スクロールイベントを発生させ、初期位置を決定
        $window.trigger('scroll');
    }

    // $('#btn').on( 'click', function(){
    //     $('html').toggleClass('active');
    //     if( $(this).hasClass('close') ){
    //         $(this).text('MENU').removeClass('close');
    //     } else {
    //         $(this).text('CLOSE').addClass('close');
    //     }
    //     $('.hRight').toggleClass('open_nav');
    // } );

    $('.btn').on('click', function(event) {
    	$(this).parent().next().slideToggle("fast");
    	event.preventDefault();
    	/* Act on the event */
    });

    //ページ内スクロール
    $('a[href^=#]').click(function() {
        // スクロールの速度
        var speed = 400; // ミリ秒
        var topOffset = 80;
        // アンカーの値取得
        var href= $(this).attr("href");
        // 移動先を取得
        var target = $(href == "#" || href == "" ? 'html' : href);
        // 移動先を数値で取得
        var position = target.offset().top - topOffset;
        // スムーススクロール
        $('body,html').animate({scrollTop:position}, speed, 'swing');
        return false;
    });



    $('.bg').each(function() {
        $(window).load(function() {
                // ボーダーコンテナー生成
                addBorderContainer();
                new WOW().init();
        });
    });
    function addBorderContainer( ){
        var $elm = $('.bg');
        $elm.append( $('<div class="back_border"></div>') );
        $elm.each(function(index, el) {
            var h = $(this).innerHeight(),
                borderH = 80,
                n = h / borderH;
            addBorder( $(this).find(".back_border"), n, borderH );
        });
    }

    // ボーダー生成
    function addBorder( elm, n, borderH ){
        var li = [];
        for (var i = -1; ++i < n;) {
            li.push('<span class="wow slideInRight" data-wow-duration="1s" data-wow-delay="0s" style="height:'+borderH+'px"></span>');
        }
        elm[0].innerHTML = li.join("");
    }

    function removeBorder( elm, n, borderH ){
        $('.back_border').remove();
    }

    if(_ua.Mobile){
    } else {
        var timer = false;

        $(window).on('resize', function(){
            if (timer !== false) {
                clearTimeout(timer);
            }
            timer = setTimeout(function() {
                removeBorder();
                addBorderContainer();
            }, 200);
        });
    }



　//追加ルールの定義
  var methods = {
    phone: function(value, element){
      return this.optional(element) || /^\d{11}$|^\d{3}-\d{4}-\d{4}$/.test(value);
    }
  };

  //メソッドの追加
  $.each(methods, function(key) {
    $.validator.addMethod(key, this);
  });

  //入力項目の検証ルール定義
  var rules = {
    company: {required: true},
    name: {required: true},
    company: {required: true},
    // phone: "phone",
    mail: {required: true, email: true, equalTo: "#remail"},
    remail: {required: true, email: true},
    text: {required: true}
  };

  //入力項目ごとのエラーメッセージ定義
  var messages = {
    name: {
        required: "*名前を入力してください"
    },
    company:{
        required: "*入力してください"
    },
    phone: "*正しい電話番号の形式で入力してください",
    mail: {
        required: "*メールアドレスを入力してください",
        email: "*正しいメールアドレスの形式で入力してください",
        equalTo: "パスワードが一致しません"
    },
    remail: {
        required: "*メールアドレスを入力してください",
        email: "*正しいメールアドレスの形式で入力してください",
        equalTo: "メールアドレスが一致しません"
    },
    text: {
        required: "*入力してください"
    }
  };

    $('#contactForm').validate({
      rules: rules,
      messages: messages,

      //エラーメッセージ出力箇所調整
      errorPlacement: function(error, element){
        if (element.is(':radio')) {
          error.appendTo(element.parent());
        }else {
          error.insertAfter(element);
        }
      }
    });



});
