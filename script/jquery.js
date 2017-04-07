var widthInput = $('#widthInput');
var heightInput = $('#heightInput');
var colorInput = $('#colorInput');
var bgImgInput = $('#bgImgInput');
var joDrop = $('.jo-drop');
var dropHandle = $('.drop-handle');
var customText = $('.custom-text');

var xaxis = $('.x-axis');
var yaxis = $('.y-axis');

var addText = $('#addText');
var addImage = $('#addImage');


var slideParent = $('#slideParent');

var xVal, yVal, colorVal, bgImgVal, textId, textSync, imgSync;



var textIds = 0;
var imgIds = 0;
textSync = 'text'+textIds;
textSync = 'img'+imgIds;


var textEditor = '<div class=textEditor id='+textSync+'> <div class="drop-handle section-title">Your Text Here</div><div class="flex jo-drop"> <div class=form-group> <span class=form-label>Your Text :</span> <textarea class="fill-textarea custom-text"></textarea> </div><div class="form-group w50"> <span class=form-label>X-axis :</span> <input type="text" class="fill-input w50" value="50%"> </div><div class="form-group w50"> <span class=form-label>Y-axis :</span> <input type="text" class="fill-input w50" value="50%"> </div></div></div>'
var defaultText = ' <div class="default-text '+textSync+'"> Your Text Here </div>'

widthInput.on('input', function() {
    xVal = $(this).val();
    slideParent.css({
        width: xVal
    });
});
heightInput.on('input', function() {
    yVal = $(this).val();
    slideParent.css({
        height: yVal
    });
});
colorInput.on('input', function() {
    colorVal = $(this).val();
    slideParent.css({
        background: colorVal
    });
});
bgImgInput.on('input', function() {
    bgImgVal = $(this).val();
    slideParent.css({
        background: bgImgVal
    });
});



addText.on('click', function(){
    textIds++;
    textSync = 'text'+textIds;
    $(this).parents('#sideMountController').find('.drop-handle').addClass('hide');
    $(this).parents('#sideMountController').find('.jo-drop').addClass('hide');
    $(this).parent().parent().append(' <div class=textEditor id='+textSync+'> <div class="drop-handle section-title">Your Text Here</div><div class="flex jo-drop"> <div class=form-group> <span class=form-label>Your Text :</span> <textarea class="fill-textarea custom-text">Your Text Here</textarea> </div><div class="form-group w50"> <span class=form-label>X-axis :</span> <input type="text" class="fill-input w50 x-axis" value="50%"> </div><div class="form-group w50"> <span class=form-label>Y-axis :</span> <input type="text" class="fill-input w50 y-axis" value="50%"> </div><div class="form-group"> <div class="form-btn save save-mod"> Save </div><div class="form-btn del delete-mod"> Delete </div></div></div></div>');

    slideParent.append(' <div class="default-text jo-drag snapped-middle '+textSync+'"> Your Text Here </div>');

    // var textEditor = '<div class=textEditor id='+textSync+'> <div class="drop-handle section-title">Your Text Here</div><div class="flex jo-drop"> <div class=form-group> <span class=form-label>Your Text :</span> <textarea class="fill-textarea custom-text"></textarea> </div><div class="form-group w50"> <span class=form-label>X-axis :</span> <input type="text" class="fill-input w50" value="50%"> </div><div class="form-group w50"> <span class=form-label>Y-axis :</span> <input type="text" class="fill-input w50" value="50%"> </div></div></div>'
    // var defaultText = ' <div class="default-text '+textSync+'"> Your Text Here </div>'
})

addImage.on('click', function(){
    imgIds++;
    imgSync = 'img'+imgIds;
    $(this).parents('#sideMountController').find('.drop-handle').addClass('hide');
    $(this).parents('#sideMountController').find('.jo-drop').addClass('hide');
    $('#sideMountController').append(' <div class="imgEditor" id="imgMo"> <div class="drop-handle section-title">Your Text Here</div><div class="flex jo-drop"> <div class=form-group> <span class=form-label>Image Name :</span> <input type="text" class="fill-input w50 img-name"> </div><div class=form-group> <span class=form-label>Select File :</span> <input type="file" class="fill-input w50 img-src-input"> </div></div></div>')
})

$('#parentContainer').on("click", ".drop-handle", function() {
    $(this).toggleClass('hide');
    $(this).parent().find('.jo-drop').toggleClass('hide');
});

$('#parentContainer').on("click", ".delete-mod", function() {
    $(this).parents('.textEditor').remove();
    textId = $(this).parents('.textEditor').attr('id');
    $('.'+textId).remove();
});




$('#parentContainer').on("input", ".custom-text", function() {
    $(this).parents('.textEditor').find('.section-title').html($(this).val())
    textId = $(this).parents('.textEditor').attr('id');
    $('.'+textId).html($(this).val());
    $('.'+textId).css({
        width: 'auto'
    })

});

$('#parentContainer').on("mouseenter", ".textEditor", function() {
    textId = $(this).attr('id');
    $('.'+textId).addClass('hover');
});
$('#parentContainer').on("mouseleave", ".textEditor", function() {
    $('.default-text').removeClass('hover');
});



$('#parentContainer').on("input", ".x-axis", function() {
    textId = $(this).parents('.textEditor').attr('id');
    var x = $(this).val();
    $('.'+textId).css({
        left: x
    })
});

$('#parentContainer').on("input", ".y-axis", function() {
    textId = $(this).parents('.textEditor').attr('id');
    var x = $(this).val();
    $('.'+textId).css({
        top: x
    })
});


// $(document).ready(function() {
//     var $dragging = null;
//
//     $('#slideParent').on("mousemove", function(e) {
//         if ($dragging) {
//             $dragging.offset({
//                 top: e.pageY ,
//                 left: e.pageX - $(this).outerWidth()/2
//             });
//         }
//     });
//
//     $(document.body).on("mousedown", ".jo-drag", function (e) {
//         $dragging = $(e.target);
//     });
//
//     $(document.body).on("mouseup", function (e) {
//         $dragging = null;
//     });
// });
var xxx, yyy, curClass, outerW;

(function($) {
    $.fn.drags = function(opt) {

        opt = $.extend({
            handle: "",
            cursor: "move",
            draggableClass: "jo-drag",
            activeHandleClass: "active-handle"
        }, opt);

        var $selected = null;
        var $elements = (opt.handle === "") ? this : this.find(opt.handle);

        $elements.css('cursor', opt.cursor).on("mousedown", function(e) {
            if(opt.handle === "") {
                $selected = $(this);
                $selected.addClass(opt.draggableClass);
            } else {
                $selected = $(this).parent();
                $selected.addClass(opt.draggableClass).find(opt.handle).addClass(opt.activeHandleClass);
            }
            var drg_h = $selected.outerHeight(),
                drg_w = $selected.outerWidth(),
                pos_y = $selected.offset().top + drg_h - e.pageY,
                pos_x = $selected.offset().left + drg_w - e.pageX;
            $(document).on("mousemove", function(e) {
                $selected.offset({
                    top: e.pageY + pos_y - drg_h,
                    left: e.pageX + pos_x - drg_w
                });
                $selected.removeClass('snapped-middle');
                xxx = $selected.position().left;
                yyy = $selected.position().top;
                curClass = $selected.attr('class').split(' ').pop();
                $('#'+curClass).find('.x-axis').val(Math.floor(xxx) + 'px');
                $('#'+curClass).find('.y-axis').val(Math.floor(yyy) + 'px');

                $('#'+curClass).find('.section-title').addClass('affected');

                $('#'+curClass).find('.section-title').addClass('affected');

                // $('#'+curClass).find('.jo-drop').removeClass('hide');
                // $('#'+curClass).find('.drop-handle').removeClass('hide');




            }).on("mouseup", function() {
                // curClass = $selected.attr('class').split(' ').pop();
                $('#'+curClass).find('.section-title').removeClass('affected');
                $(this).off("mousemove"); // Unbind events from document
                if ($selected !== null) {
                    $selected.removeClass(opt.draggableClass);

                    $selected = null;
                }
            });
            e.preventDefault(); // disable selection
        }).on("mouseup", function() {
            if(opt.handle === "") {
                // $selected.removeClass(opt.draggableClass);
            } else {
                $selected.removeClass(opt.draggableClass)
                    .find(opt.handle).removeClass(opt.activeHandleClass);
            }
            $selected = null;
        });

        return this;

    };
})(jQuery);


$('#parentContainer').on("mouseenter", ".jo-drag", function() {
    $(this).drags();
});
$('#parentContainer').on("mouseenter", ".default-text", function() {
    outerW = $(this).outerWidth()
    $(this).css({
        width: outerW+'px'
    })
});

$('#parentContainer').on('mouseenter', '.default-text', function(){
    curClass = $(this).attr('class').split(' ').pop();
    $('#'+curClass).find('.section-title').addClass('hover');
})

$('#parentContainer').on('mouseleave', '.default-text', function(){
    $('.section-title').removeClass('hover');
})
$('#parentContainer').on('change', '.img-src-input', function(){
    console.log($(this).val());
    curClass = $(this).parents('.imgEditor').attr('id')
    console.log(curClass);
    $('.'+curClass).find('.img-manip').attr('src', 'img/gallery/yeezy_1.jpg');

})

var save, saveX, saveY, saveText, saveId, saveWidth;


$('#parentContainer').on("click", ".save-mod", function() {
    saveX = 'left:'+ $(this).parents('.textEditor').find('.x-axis').val();
    saveY = 'top:'+ $(this).parents('.textEditor').find('.y-axis').val();
    saveId = 'id:'+ $(this).parents('.textEditor').attr('id');
    saveText = 'text:'+ $(this).parents('.textEditor').find('.custom-text').val();


    console.log(saveX + ' '+ saveY + ' '+ saveId+ ' '+ saveText);
});
