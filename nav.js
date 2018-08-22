$(function(){
    verificarSesion();
    $("#login_modal").on("click",function(){
        $("#singIn_modal").modal().hide();
    })
    $("#log_in").on("click",function(){
        let userEmail = $("#username_f").val();
        let userPass = $("#password_f").val();
        let user_info = {
            email:userEmail,
            pass:userPass
        }

        $.ajax({
            url: "api_nav.php",
            type:"POST",
            dataType: "json",
            data: { 
                user_login :JSON.stringify(user_info), 
                operacion: "logIn"
            },
            success: function($data_send){
                console.log($data_send);
                if($data_send == 10){
                    alert("Datos Incorrectos");
                    $("#close_singin").click();
                }else{
                    if($data_send == 20){
                        alert("Usuario no registrado"); 
                        $("#close_singin").click();
                    }else{
                        alert("Bienvenido " +$data_send["nombre"]);
                        $("#close_singin").click();
                        /* mierda($data_send); */
                    }  
                }
            }
        });
    });
    $("#log_out").on("click", function(){
        $.ajax({
            url: "api_nav.php",
            type:"POST",
            dataType: "json",
            data: { 
                operacion: "logOut"
            },
            success: function(msg){
                alert("Deslogeado");
            }
        })
    });
    
    function verificarSesion(){
        $.ajax({
            url:"api_nav.php",
            type:"POST",
            data: {operacion: "verificar"},
            success:function($data_send){
                console.log($data_send);

            }
        })
    };

    /* function mierda($data_send){
        $("#mi_nav").html(`
            <nav class="navbar navbar-dark bg-dark">
                <a class="navbar-brand" href="#">Navbar</a>
                <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
                </button>
                <div class="collapse navbar-collapse" id="navbarNavAltMarkup">
                    <div class="navbar-nav my_nav">
                        <a class="nav-item nav-link active" href="index.html">Home </a>
                        
                    </div>
                    <div class="navbar-nav">
                        <h1> Bienvenido ${$data_send["nombre"]}
                        <a class="nav-item nav-link pointer" id="log_out"> Log Out </a>
                    </div>
                </div>
            </nav>
        `)
    } */

    
});

