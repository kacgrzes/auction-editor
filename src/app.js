(function () {

    //var clipboard = new Clipboard('#copy-btn');
    var button = document.getElementById('copy-btn');
    button.addEventListener('click', get_content, false);

    new Clipboard('#copy-btn', {
        text: function() {
            return get_content();
        }
    });
    var auth = 'Client-ID 3de0527100c3295';

    tinymce.init({
        selector: '#auction',
        theme: 'modern',
        browser_spellcheck: true,
        plugins: [
            "paste", "image", "imagetools", "spellchecker", "preview"
        ],
        language: 'pl',
        language_url : 'src/langs/pl.js',
        width: 800,
        height: 400,
        paste_data_images: true,
        style_formats: [
            {title: 'Bold text', inline: 'b'},
            {title: 'Red text', inline: 'span', styles: {color: '#ff0000'}},
            {title: 'Red header', block: 'h1', styles: {color: '#ff0000'}},
            {title: 'Example 1', inline: 'span', classes: 'example1'},
            {title: 'Example 2', inline: 'span', classes: 'example2'},
            {title: 'Table styles'},
            {title: 'Table row 1', selector: 'tr', classes: 'tablerow1'}
        ],
        content_css: '/src/mycontent.css',
        images_upload_handler: function (blobInfo, success, failure) {
            $.ajax({
                url: 'https://api.imgur.com/3/image',
                type: 'POST',
                headers: {
                    Authorization: auth,
                    Accept: 'application/json'
                },
                data: {
                    image: blobInfo.base64(),
                    type: 'base64'
                },
                success: function(result) {
                    console.log(result.data.link);
                    debugger;
                    success(result.data.link);
                }
            });
        }
    });

    function get_content() {
        return tinymce.activeEditor.getContent();
    }

})();
