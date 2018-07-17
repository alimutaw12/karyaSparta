
    /*
     * Object Terminal
     */
    var _terminal = {
      index        : -2,
      indexChanged : false,
      buka: function(link) {
        window.open(link, '_blank');
      },
      sapa: function(nama) {
        this.appendResponse("Halo " + nama);
      },
      help: function() {
        this.appendHelp();
      },
      tambah: function(angka1, angka2) {
        int1 = parseInt(angka1);
        int2 = parseInt(angka2);
        this.appendResponse(int1+int2);
      },
      kurang: function(angka1, angka2) {
        int1 = parseInt(angka1);
        int2 = parseInt(angka2);
        this.appendResponse(int1-int2);
      },
      bagi: function(angka1, angka2) {
        int1 = parseInt(angka1);
        int2 = parseInt(angka2);
        this.appendResponse(int1/int2);
      },
      kali: function(angka1, angka2) {
        int1 = parseInt(angka1);
        int2 = parseInt(angka2);
        this.appendResponse(int1*int2);
      },
      appendResponse: function(message) {
        $("#terminal").append("<div class='bot_output'>" + message + "</div>");
      },
      appendInput: function () {
        $("#terminal").append("<span>$ali : </span> <input class='user_input' placeholder='_'>");
      },
      appendHelp: function() {
        op =  "<div class='bot_output'>";
        op += "buka (link dengan http)</br>";
        op += "tambah (angka) (angka)</br>";
        op += "kurang (angka) (angka)</br>";
        op += "bagi (angka) (angka)</br>";
        op += "kali (angka) (angka)</br>";
        op += "sapa (nama)"
        op += "</div>"
        $("#terminal").append(op);
      },
      travelDom: function(sign) {
        if (sign == '+' && this.indexChanged == true) {
          this.index++;
        } else if(sign == '-' && this.indexChanged == true) {
          this.index--;
        }

        data = $(".user_input").eq(this.index).val();
        $(".user_input").last().val(data);
        this.indexChanged = true;
      }

    };

     /*
      * user klik enter, kasih response
      */
      $("#terminal").on('keyup', '.user_input', function(e){
        if (e.keyCode == 13) {
          //reset index
          _terminal.index        = -2;
          _terminal.indexChanged = false;

          $(this).attr("disabled", "disabled");
          var values = $(this).val().trim().split(" ");

          if (values == '' || (values[0] != "buka" && values[0] != "tambah" && values[0] != "kurang" && values[0] != "kali" && values[0] != "bagi" && values[0] != "sapa" && values[0] != "help")) {
             _terminal.appendResponse( "commandnya error, tidak dikenal" );
          } else {
            if (typeof _terminal[values[0]] != "undefined") {
              if (values.length == 2) {
                _terminal[values[0]](values[1]);
              } else if (values.length == 3) {
                _terminal[values[0]](values[1], values[2]);
              } else {
                _terminal[values[0]]();
              }
            }
          }
          _terminal.appendInput();
        }
      });

      /*
       * user klik tanda panah atas/bawah
       * jalan-jalan di DOM
       */
      $("#terminal").keydown(function(e) {
          if (e.keyCode == 38)
            _terminal.travelDom('-');

          if (e.keyCode == 40)
            _terminal.travelDom('+');
      });
