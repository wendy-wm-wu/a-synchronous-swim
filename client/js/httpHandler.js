(function() {

  const serverUrl = 'http://127.0.0.1:3000';

  //
  // TODO: build the swim command fetcher here
  //
  const ajaxFetchSwimCommand = () => {
    //do something
    $.ajax({
      type: 'GET',
      url: `${serverUrl}/swim`,
      dataType: 'json',
      success: (data) => {
        for (let i = 0; i < data.messageQueue.length; i++) {
          SwimTeam.move(data.messageQueue[i]);
        }
        // reload thepage
        // window.location = window.location.href;
      },
      error: () => console.log('error')
    });
  }

  // setInterval(ajaxFetchSwimCommand, 10000);


  /////////////////////////////////////////////////////////////////////
  // The ajax file uplaoder is provided for your convenience!
  // Note: remember to fix the URL below.
  /////////////////////////////////////////////////////////////////////

  const ajaxFileUplaod = (file) => {
    var formData = new FormData();
    formData.append('file', file);
    $.ajax({
      type: 'POST',
      data: formData,
      url: 'http://127.0.0.1:3000',
      cache: false,
      contentType: false,
      processData: false,
      success: () => {
        // $('.background').style.backgroundImage = url('http://127.0.0.1:3000/background.jpg');
        window.location = window.location.href;
      },
      error: () => {
        console.log('error');
      }
    });
  };

  $('form').on('submit', function(e) {
    e.preventDefault();

    var form = $('form .file')[0];
    if (form.files.length === 0) {
      console.log('No file selected!');
      return;
    }

    var file = form.files[0];
    if (file.type !== 'image/jpeg') {
      console.log('Not a jpg file!');
      return;
    }

    ajaxFileUplaod(file);
  });

})();
