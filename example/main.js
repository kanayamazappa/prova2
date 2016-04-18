$(document).ready(function(){
    refreshTable();
    
    $('#cancelar-cadastro').click(function(){
        $('#frm-cadastro').hide();
        return false;
    });
    
    $('#adicionar-cadastro').click(function(){
        limpa_form($('#frm-cadastro'));
        $('#frm-cadastro').show();
        return false;
    });
    
    $('#frm-cadastro').submit(function(){
        var id = $('#id').val();
        var nome = $('#nome').val();
        var local = $('#local').val();
        var idioma = $('#idioma').val();
        var foto = $('#foto').val();
        var descricao = $('#descricao').val();
        
        if(nome == ''){
            alert('Preencha o nome corretamente.');
            return false;
        }
        
        if(id == ''){
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "http://127.0.0.1:5000/person/",
                "method": "POST",
                "headers": {
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "f62429d2-d2b6-12ad-1790-85ec2a82c84b"
                },
                "processData": false,
                "data": '{"descricao": "' + descricao + '","foto": "' + foto + '","idioma": "' + idioma + '","local": "' + local + '","nome": "' + nome + '"}'
            }
                
            $.ajax(settings).done(function (response) {
                alert(response.message);
                limpa_form($('#frm-cadastro'));
            }).fail(function(jqXHR, textStatus, errorThrown){
                alert('Não foi possível realizar a operação no momento, tente novamente mais tarde.');
            });
        } else {
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "http://127.0.0.1:5000/person/" + id,
                "method": "PUT",
                "headers": {
                    "content-type": "application/json",
                    "cache-control": "no-cache",
                    "postman-token": "c38a5ed2-7646-4a17-0961-f53d873d0c2d"
                },
                "processData": false,
                "data": '{"descricao": "' + descricao + '","foto": "' + foto + '","idioma": "' + idioma + '","local": "' + local + '","nome": "' + nome + '"}'
            }
                
            $.ajax(settings).done(function (response) {
                alert(response.message);
                limpa_form($('#frm-cadastro'));
            }).fail(function(jqXHR, textStatus, errorThrown){
                alert('Não foi possível realizar a operação no momento, tente novamente mais tarde.');
            });
        }
        $('#frm-cadastro').hide();
        refreshTable();
        return false;
    });
    
    $('#get-twitter-cadastro').click(function(){
        
        var screen_name = $('#url_twitter_cadastro').val();
        
        if(screen_name != '') {
            
            try {
                screen_name = screen_name.split('/');
                screen_name = screen_name[screen_name.length - 1];
                screen_name = screen_name.replace('@', '');
                
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "http://127.0.0.1:5000/person/twitter/" + screen_name,
                    "method": "GET",
                    "headers": {
                        "cache-control": "no-cache",
                        //"postman-token": "27b86c8c-3583-3d48-1c92-3f4293bdc817"
                    }
                }
                
                $.ajax(settings).done(function (response) {
                    
                    $('#nome').val(response.nome);
                    $('#local').val(response.local);
                    $('#idioma').val(response.idioma);
                    $('#descricao').val(response.descricao);
                    
                    convertFileToDataURLviaFileReader(response.foto, function(base64encoded) {
                        $('#foto').val(base64encoded);
                        $('#preview').attr('src', base64encoded);
                    })
                }).fail(function(jqXHR, textStatus, errorThrown){
                    alert('Não foi possível realizar a operação no momento, tente novamente mais tarde.');
                });
            } catch(ex) {
                alert(ex);
            }
        } else {
            alert('Preencha o campo Url do Twitter');
            $('#url_twitter').focus();
        }
        return false;
    });
    
    $('#aux_foto').on('change',function(){
        var file    = $('#aux_foto')[0].files[0];
        var reader  = new FileReader();
        
        reader.addEventListener("load", function () {
            $('#preview').attr('src', reader.result);
            $('#foto').val(reader.result);
        }, false);
        
        if (file) {
            reader.readAsDataURL(file);
        }
    });
});
function refreshTable(){
    $('.editar-cadastro').unbind();
    $('.deletar-cadastro').unbind();
    $('#table-cadastro tbody').html('');
    
    var settings = {
        "async": true,
        "crossDomain": true,
        "url": "http://127.0.0.1:5000/person/",
        "method": "GET",
        "headers": {
            "cache-control": "no-cache",
            "postman-token": "0cab7a9b-0fb6-ce57-441e-ac40f69bbf4b"
            }
    }
    
    $.ajax(settings).done(function (response) {
        $.each(response, function(key, item) {
            $('#table-cadastro tbody').append('<tr><td>' + item.nome + '</td><td>' + item.local + '</td><td>' + item.idioma + '</td><td><img src="' + item.foto + '" height="50px"></td><td>' + item.descricao + '</td><td><a href="#" data-id="' + item.id + '" class="editar-cadastro">Editar</a></td><td><a href="#" data-id="' + item.id + '" class="deletar-cadastro">Deletar</a></td></tr>');
        });
        
        $('.editar-cadastro').click(function(){
            limpa_form($('#frm-cadastro'));
            var id = $(this).data('id');
            
            var settings = {
                "async": true,
                "crossDomain": true,
                "url": "http://127.0.0.1:5000/person/" + id,
                "method": "GET",
                "headers": {
                    "cache-control": "no-cache",
                    "postman-token": "fd9eca0b-1659-8fb2-3d56-2998ae8d1d63"
                }
            }
                
            $.ajax(settings).done(function (response) {
                $('#id').val(response.id);
                $('#nome').val(response.nome);
                $('#local').val(response.local);
                $('#idioma').val(response.idioma);
                $('#descricao').val(response.descricao);
                
                convertFileToDataURLviaFileReader(response.foto, function(base64encoded) {
                    $('#foto').val(base64encoded);
                    $('#preview').attr('src', base64encoded);
                })
            }).fail(function(jqXHR, textStatus, errorThrown){
                alert('Não foi possível realizar a operação no momento, tente novamente mais tarde.');
            });
            $('#frm-cadastro').show();
            return false;
        });
        
        $('.deletar-cadastro').click(function(){
            if(confirm("Deseja realmente excluir este registro?")){
                var id = $(this).data('id');
                
                var settings = {
                    "async": true,
                    "crossDomain": true,
                    "url": "http://127.0.0.1:5000/person/" + id,
                    "method": "DELETE",
                    "headers": {
                        "cache-control": "no-cache",
                        "postman-token": "2ab142d1-c074-f58f-bfaa-8629a7f29afc"
                    }
                }
                    
                $.ajax(settings).done(function (response) {
                    alert('Usuário deletado.');
                }).fail(function(jqXHR, textStatus, errorThrown){
                    alert('Não foi possível realizar a operação no momento, tente novamente mais tarde.');
                });
                refreshTable();
            }
            return false;
        });
        
    });
    return false;   
}

function convertImgToDataURLviaCanvas(url, callback, outputFormat){
    var img = new Image();
    img.crossOrigin = 'Anonymous';
    img.onload = function(){
        var canvas = document.createElement('CANVAS');
        var ctx = canvas.getContext('2d');
        var dataURL;
        canvas.height = this.height;
        canvas.width = this.width;
        ctx.drawImage(this, 0, 0);
        dataURL = canvas.toDataURL(outputFormat);
        callback(dataURL);
        canvas = null; 
    };
    img.src = url;
}

function convertFileToDataURLviaFileReader(url, callback){
    var xhr = new XMLHttpRequest();
    xhr.responseType = 'blob';
    xhr.onload = function() {
        var reader  = new FileReader();
        reader.onloadend = function () {
            callback(reader.result);
        }
        reader.readAsDataURL(xhr.response);
    };
    xhr.open('GET', url);
    xhr.send();
}

function limpa_form(obj) {
    $(obj).find('input[type=text], input[type=hidden], input[type=file], select, textarea').val('');
    $(obj).find('input[type=checkbox]').removeAttr('checked');
    $(obj).find('input[type=radio]').removeAttr('selected');
    $(obj).find('#preview').attr('src', '');
}
