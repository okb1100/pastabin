if (!hljs) var hljs;
if (!PerfectScrollbar) var PerfectScrollbar;

$(document).ready(() => {
    /*
    Line counting on post page, perfect until line count exceed the visible lines :(
    if ($('#thePasta').length) {
        const ps = new PerfectScrollbar('#postTable');
        // for lines in textarea flush pre and put i's
        $('#thePasta').keydown(e => {
            var lines = $('#thePasta')
                .val()
                .split('\n').length;
            $('.lines>pre').text('');
            for (var i = 1; i <= lines; i++) {
                $('.lines>pre').append('<i>' + i + '\n </i>');
            }
        });
    }
    */

    // These should be wrapped around an isPreview condition
    // date formatting
    var dateElem = $('#date');
    if (dateElem.length > 0) {
        var date = new Date(parseInt(dateElem.html()));
        dateElem.html(date.toLocaleString());
    }

    // line counting
    if ($('.pastaContent').length > 0) {
        var lines = $('.pastaContent')
            .html()
            .split('\n').length;
        for (var i = 1; i <= lines; i++) {
            $('td.lines>pre').append(i + '\n');
        }
        if ($('#syntax').html().length > 0)
            $('.pastaContent > pre').each(function(i, block) {
                hljs.highlightBlock(block);
            });
        const ps = new PerfectScrollbar('.pastaCard');
    }
});

var upload = (title, content) => {
    var Pasta = {
        title: title,
        content: content
    };

    if ($('#syntaxSelector').prop('selectedIndex') > 0)
        Pasta.syntax = $('#syntaxSelector').val();

    if ($('#uploaderName').val().length > 0)
        Pasta.uploader = $('#uploaderName').val();

    $.ajax({
        method: 'POST',
        url: '/api/uploadPasta',
        processData: false,
        data: JSON.stringify(Pasta),
        contentType: 'application/json',
        success: function(data) {
            $('#submission').fadeOut(300);
            $('.alert').fadeOut(300);
            $('#sendSucceeded .alert-link').attr('href', '/' + data);
            $('#sendSucceeded #copyLink').val(window.location.href + data);
            $('#sendSucceeded').fadeIn(300);
        },
        always: function() {
            console.log('sent');
        }
    });
};

var uploadPasta = () => {
    var toUpload = null;
    var pastaName = $('#pastaName').val();
    if (
       // $('#filePasta')[0].files.length == 0 &&   // file upload check, activate it later..
        $('#thePasta').val().length < 15
    ) {
        $('.alert').fadeOut(300);
        $('#sendError')
            .fadeIn(300)
            .html('No blank submissions please.');
    }

    else {
      /*  if ($('#filePasta')[0].files.length > 0) {
            //file upload
        } else {
            upload(pastaName, $('#thePasta').val());
        }*/
        upload(pastaName, $('#thePasta').val());
    }
};

var copyToClipboard = elementToCopy => {
    elementToCopy = $(elementToCopy);
    if (elementToCopy.prop('tagName') != 'INPUT') {
        var $temp = $('<textarea>');
        $('body').append($temp);
        $temp.val(elementToCopy.prop('innerText')).select();
        document.execCommand('copy');
        $temp.remove();
    } else {
        elementToCopy.select();
        document.execCommand('copy');
    }
    alert('Copied to clipboard!');
};

var zoom = type => {
    var fontSize = parseInt($('.pastaTable').css('font-size'));
    if (type == 'in' && fontSize < 22) {
        $('.pastaTable').css('font-size', fontSize + 2);
    } else if (type == 'out' && fontSize > 12) {
        $('.pastaTable').css('font-size', fontSize - 2);
    }
};
