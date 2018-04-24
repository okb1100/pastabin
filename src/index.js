import $ from 'jquery';
// import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './css/styles.css';
import App from './reactApp';

window.onload = () => {
  App();
};

window.upload = (title, content) => {
  const Pasta = {
    title,
    content,
  };

  if ($('#syntaxSelector').prop('selectedIndex') > 0) Pasta.syntax = $('#syntaxSelector').val();

  if ($('#uploaderName').val().length > 0) Pasta.uploader = $('#uploaderName').val();

  if ($('#label').val().length > 0) Pasta.label = $('#label').val();

  $.ajax({
    method: 'POST',
    url: '/api/uploadPasta',
    processData: false,
    data: JSON.stringify(Pasta),
    contentType: 'application/json',
    success: (data) => {
      $('#submission').fadeOut(300);
      $('.alert').fadeOut(300);
      $('#sendSucceeded .alert-link').attr('href', `/${data}`);
      $('#sendSucceeded #copyLink').val(window.location.href + data);
      $('#sendSucceeded').fadeIn(300);
    },
  });
};

window.uploadPasta = () => {
  const pastaName = $('#pastaName').val();
  if ($('#thePasta').val().length < 15) {
    $('.alert').fadeOut(300);
    $('#sendError')
      .fadeIn(300)
      .html('No blank submissions please.');
  } else {
    window.upload(pastaName, $('#thePasta').val());
  }
};
