
(function ($) {

	// Store our function as a property of Drupal.behaviors.
	Drupal.behaviors.buscador_publicaciones = {
		attach: function (context, settings) {
			// Find all the secure links inside context that do not have our processed
			// class.
			var basePath = Drupal.settings.basePath + Drupal.settings.buscador_publicaciones.modulepath;
			var srcimgOn =  basePath+ "/img/btn_filtroBusquedaOn.png";
			var srcimgOff = basePath + "/img/btn_filtroBusquedaOff.png";
			var label = $('#views-exposed-form-publicaciones-page-2 #edit-search-api-views-fulltext-wrapper label');
			var input = $('#views-exposed-form-publicaciones-page-2 #edit-search-api-views-fulltext-wrapper #edit-search-api-views-fulltext');

			var label_nueva = $('#views-exposed-form-publicaciones-nueva-block #edit-search-api-views-fulltext-wrapper label');
			var input_nueva = $('#views-exposed-form-publicaciones-nueva-block #edit-search-api-views-fulltext-wrapper #edit-search-api-views-fulltext');

			if (label_nueva.length != 0) {
				input_nueva.attr('placeholder', label_nueva.html().trim());
				label_nueva.remove();
			}

			if(label.length != 0) {
				input.attr('placeholder', label.html().trim());
				label.remove();
			}
			if ($("#selFiltros").val() == "true") {
				$("#filtros").css("display", "block");
				var desplegado = false;

			} else {
				$("#filtros").css("display", "none");
				$("#linkFiltros").html('<img src="'+srcimgOff+'"alt="Desplegar filtros de búsqueda " title="Desplegar filtros de búsqueda" />');
				var desplegado = true;

			}
						// damos funcionalidad para plegar/desplegar
		//	$('#linkFiltros').on('click',// function(){
			$('#linkFiltros').unbind('click').bind('click',// function() {
			//	$("#linkFiltros").click(
				function() {

					$("#filtros").slideToggle( "slow" , function() {
							// Animation complete.

						if(desplegado){
							desplegado = false;
						} else {
							desplegado = true;
						}
					});
					if(!desplegado){
						$(this).html('<img src="'+srcimgOff+'"alt="Desplegar filtros de búsqueda " title="Desplegar filtros de búsqueda" />');
					} else {
						$(this).html('<img src="'+srcimgOn+'"alt="Plegar filtros de búsqueda" title="Plegar filtros de búsqueda" />');
					}
				}
			);
		}
	};

	Drupal.behaviors.buscador_publicaciones_bloque = {
		attach: function (context, settings) {
			// Find all the secure links inside context that do not have our processed
			// class.
			var basePath = Drupal.settings.basePath + Drupal.settings.buscador_publicaciones.modulepath;
			var srcimgOn =  basePath+ "/img/btn_filtroBusquedaOn.png";
			var srcimgOff = basePath + "/img/btn_filtroBusquedaOff.png";
			var label = $('#views-exposed-form-publicaciones-block-busc-publicaciones #edit-search-api-views-fulltext-wrapper label');
			var input = $('#views-exposed-form-publicaciones-block-busc-publicaciones #edit-search-api-views-fulltext-wrapper #edit-search-api-views-fulltext');

			if(label.length != 0) {
				input.attr('placeholder', label.html().trim());
				label.remove();
			}
			if ($("#selFiltros").val() == "true") {
				$("#filtros").css("display", "block");
				var desplegado = false;

			} else {
				$("#filtros").css("display", "none");
				$("#linkFiltros").html('Busqueda avanzada <img src="'+srcimgOff+'"alt="Desplegar filtros de búsqueda " title="Desplegar filtros de búsqueda" />');
				var desplegado = true;

			}
						// damos funcionalidad para plegar/desplegar
		//	$('#linkFiltros').on('click',// function(){
			$('#linkFiltros').unbind('click').bind('click',// function() {
			//	$("#linkFiltros").click(
				function() {

					$("#filtros").slideToggle( "slow" , function() {
							// Animation complete.

						if(desplegado){
							desplegado = false;
						} else {
							desplegado = true;
						}
					});
					if(!desplegado){
						$(this).html('Busqueda avanzada <img src="'+srcimgOff+'"alt="Desplegar filtros de búsqueda " title="Desplegar filtros de búsqueda" />');
					} else {
						$(this).html('Busqueda avanzada <img src="'+srcimgOn+'"alt="Plegar filtros de búsqueda" title="Plegar filtros de búsqueda" />');
					}
				}
			);
		}
	};
}(jQuery));

function placeholdIt(element, context) {

    $(element, context).once('placehold-it', function () {
      var formItem = $(this);
      var input = formItem.find('input');
      var label = formItem.find('label');

      // Add class to select
      var select = $(this).find('select');
      var checkbox = $(this).find('input[type="checkbox"]');

      if ($(select).length > 0 || $(checkbox).length > 0) {
        $(label).show();
      }
      else {
        if (label.length > 0) {
          input.attr('placeholder', label.html().trim());
          //label.hide();
          label.remove();
        }
      }

    });
  }
;
(function ($) {

  // Store our function as a property of Drupal.behaviors.
  Drupal.behaviors.buscador_salud = {
    attach: function (context, settings) {
      var limiteElementos = Drupal.settings.buscador_salud.numero_elementos;
      // Selecciona el elemento ul por su id.
      var elementos = $('.page-salud-buscador .facetapi-facet-sm-search-api-aggregation-1').children('li');
      for (var i = limiteElementos; i < elementos.length+1; i++) {
        $(elementos[i]).remove();
      }
    }
  };
}(jQuery));

;

(function($) {

  Drupal.Collapsiblock = Drupal.Collapsiblock || {};

  Drupal.behaviors.collapsiblock = {

    attach: function (context,settings) {
      var cookieData = Drupal.Collapsiblock.getCookieData();
      var slidetype = settings.collapsiblock.slide_type;
      var defaultState = settings.collapsiblock.default_state;
      var slidespeed = parseInt(settings.collapsiblock.slide_speed,10);
      var title = settings.collapsiblock.block_title;
      var block = settings.collapsiblock.block;
      var block_content = settings.collapsiblock.block_content;
      $(block + ':not(.collapsiblock-processed)', context).addClass('collapsiblock-processed').each(function () {
        var id = this.id.replace(/_/g, '-');
        var titleElt = $(title, this).not($('.content :header',this));
        if (titleElt.size()) {
          titleElt = titleElt[0];
          // Status values: 1 = not collapsible, 2 = collapsible and expanded, 3 = collapsible and collapsed, 4 = always collapsed
          var stat = settings.collapsiblock.blocks[id] ? settings.collapsiblock.blocks[id] : defaultState;
          if (stat == 1) {
            return;
          }

          titleElt.target = $(this).find(block_content);
          $(titleElt)
          .wrapInner('<a href="#' + id +'" role="link" />')
          .addClass('collapsiblock')
          .click(function (e) {
            e.preventDefault();  
            var st = Drupal.Collapsiblock.getCookieData();
            if ($(this).is('.collapsiblockCollapsed')) {
              $(this).removeClass('collapsiblockCollapsed');
              if (slidetype == 1) {
                $(this.target).slideDown(slidespeed).attr('aria-hidden', false);
              }
              else {
                $(this.target).animate({
                  height:'show',
                  opacity:'show'
                }, slidespeed);
              }

              // Don't save cookie data if the block is always collapsed.
              if (stat != 4) {
                st[id] = 1;
              }
            }
            else {
              $(this).addClass('collapsiblockCollapsed');
              if (slidetype == 1) {
                $(this.target).slideUp(slidespeed).attr('aria-hidden', true);
              }
              else {
                $(this.target).animate({
                  height:'hide',
                  opacity:'hide'
                }, slidespeed);
              }

              // Don't save cookie data if the block is always collapsed.
              if (stat != 4) {
                st[id] = 0;
              }
            }
            // Stringify the object in JSON format for saving in the cookie.
            var cookieString = '{ ';
            var cookieParts = [];
            $.each(st, function (id, setting) {
              cookieParts[cookieParts.length] = ' "' + id + '": ' + setting;
            });
            cookieString += cookieParts.join(', ') + ' }';
            $.cookie('collapsiblock', cookieString, {
              path: settings.basePath
            });
          });
          $('a[role=link]', titleElt).click(function (e) {
            e.preventDefault();
          });
          // Leave active blocks uncollapsed. If the block is expanded, do nothing.
          if (stat ==  4 || (cookieData[id] == 0 || (stat == 3 && cookieData[id] == undefined)) && !$(this).find('a.active').size()) {
            // Allow block content to assign class 'collapsiblock-force-open' to it's content to force
            // itself to stay open. E.g. useful if block contains a form that was just ajaxly updated and should be visible
            if (titleElt.target.hasClass('collapsiblock-force-open') || titleElt.target.find('.collapsiblock-force-open').size() > 0) {
              return;
            }
            $(titleElt).addClass('collapsiblockCollapsed');
            $(titleElt.target).hide();
          }
        }
      });
    }

  };

  Drupal.Collapsiblock.getCookieData = function () {
    if ($.cookie) {
      var cookieString = $.cookie('collapsiblock');
      return cookieString ? $.parseJSON(cookieString) : {};
    }
    else {
      return '';
    }
  };


})(jQuery);
;
	jQuery(document).ready(function($) {
    
    $('#mostrar_elementos').on('click',function(){
      $('.bloque-catalogos-oculto').toggle('slow');
      $('#mostrar_elementos').hide();
    });
    
    $('#ocultar_elementos').on('click',function(){
      $('.bloque-catalogos-oculto').toggle();
      $('#mostrar_elementos').show();
    });
    
  
});

;
jQuery(document).ready(function($) {
    
    $('#mostrar_conjuntos').on('click',function(){
      $('.contenedor_oculto').toggle('slow');
      $('#mostrar_conjuntos').hide();
      $('#ocultar_conjuntos').show();
    });
    
    $('#ocultar_conjuntos').on('click',function(){
      $('.contenedor_oculto').toggle();
      $('#mostrar_conjuntos').show();
      $('#ocultar_conjuntos').hide();
    });
    
  
});
;
jQuery(document).ready(function($) {
    
    $('#edit-dataset--2').on('click',function(){
		$("#edit-dataset--2").val("");
    });
});
;
jQuery(document).ready(function($) {
    	
	$("a").click(function(){
		$(".elemento").toggleClass("abierto");
	});
    

	$('.field-name-field-block-reference').each(function(){
		if($(this).hasClass('tipo-auto')) {
			$(".field-name-field-consumo-faq").css("display", "none");
		}	 
	});
	
	
});;
(function ($) {
    'use strict';
    Drupal.behaviors.ACChangeEnterBehavior = {
        attach: function (context, settings) {
            $('input.form-autocomplete', context).once('ac-change-enter-behavior', function() {
                $(this).keypress(function(e) {
                    var ac = $('#autocomplete');
                    if (e.keyCode == 13 && typeof ac[0] != 'undefined') {
                        e.preventDefault();
                        ac.each(function () {
                            if(this.owner.selected == false){
                                this.owner.selectDown();
                            }
                            this.owner.hidePopup();
                        });
                        $(this).trigger('change');
                    }
                });
            });
        }
    };
}(jQuery));
;
/**
 * @file
 * equalheights module javascript settings.
 */
(function($) {
  Drupal.behaviors.equalHeightsModule = {
    attach: function (context, settings) {
      if (Drupal.settings.equalHeightsModule) {
        var eqClass = Drupal.settings.equalHeightsModule.classes;
      }
      if (eqClass) {
        equalHeightsTrigger();
        $(window).bind('resize', function () {
          equalHeightsTrigger();
        });
      }
      function equalHeightsTrigger() {
        $.each(eqClass, function(eqClass, setting) {
          var target = $(setting.selector);
          var minHeight = setting.minheight;
          var maxHeight = setting.maxheight;
          var overflow = setting.overflow;
          target.css('height', '');
          target.css('overflow', '');

          // Disable equalheights not matching the mediaquery
          var mediaQuery = setting.mediaquery;
          var matchMedia = window.matchMedia;
          if (mediaQuery) {
            if (matchMedia && !matchMedia(mediaQuery).matches) {
                return;
              } else {
                equalHeightsLoad(target, minHeight, maxHeight, overflow);
              }
            } else {
              equalHeightsLoad(target,minHeight, maxHeight, overflow);
          }
        });
      }
      function equalHeightsLoad(target, minHeight, maxHeight, overflow) {
          // disable imagesloaded for IE<=8
          var imagesLoadedIE8 = Drupal.settings.equalHeightsModule.imagesloaded_ie8;
          if (imagesLoadedIE8 && window.attachEvent && !window.addEventListener) {
              target.equalHeights(minHeight, maxHeight).css('overflow', overflow);
          } else {
          // imagesloaded library checks if all images are loaded before callback
           target.imagesLoaded({
           callback: function($images, $proper, $broken) {
             this.equalHeights(minHeight, maxHeight).css('overflow', overflow)
           }
          });
          }
      }

    }
  }
})(jQuery);
;
(function($){

	$(document).ready(function(){
		
		if($('#solicitud-alojamiento-albergues-entityform-edit-form').length) {
			

			if($('#edit-field-conozco-acep-albergue-und').is(':checked') ){

				$('#edit-field-tipo-solicitud-und').prop('disabled', 'disabled');
				$('#edit-field-tipo-alojamiento-und').prop('disabled', 'disabled');

				if($('#edit-field-tipo-solicitud-und').val() == 'entidad'){
					$('#fieldset-entidad').show();

				} else {
					// es individual
					$('#fieldset-entidad').hide();
				}

				if($('#edit-field-tipo-alojamiento-und').val() == 'albergue'){
					
					$('#fieldset-progama-actividad').hide();
					$('#fieldset-descripcion-actividad').hide();

				} else {
					// es refugio
					$('#fieldset-progama-actividad').show();
					$('#fieldset-descripcion-actividad').show();
				}	


				$('#capa-global').css('display', 'inline');

			} else {

				$('#edit-field-tipo-solicitud-und').prop('disabled', 'disabled');
				$('#edit-field-tipo-alojamiento-und').prop('disabled', 'disabled');
				$('#fieldset-entidad').hide();
				$('#fieldset-progama-actividad').hide();
				$('#fieldset-descripcion-actividad').hide(); 
			}
			
				
			$('#edit-field-conozco-acep-albergue-und').change(function() {
				if($(this).is(':checked')) {					
					// Se  habilitan los selectores de tipo de alojamiento y tipo de solicitud
					$('#edit-field-tipo-solicitud-und').prop('disabled', false);
					$('#edit-field-tipo-alojamiento-und').prop('disabled', false);
					$('#capa-global').css('display', 'inline');

				} else {
					$('#edit-field-tipo-solicitud-und').prop('disabled', 'disabled');
					$('#edit-field-tipo-alojamiento-und').prop('disabled', 'disabled');
					$('#capa-global').css('display', 'none');

				}



			});


			//change select tipo solicitud
			$('#edit-field-tipo-solicitud-und').change(function() {

				if($(this).val() == 'entidad'){
					$('#fieldset-entidad').show();

				} else {
					// es individual
					$('#fieldset-entidad').hide();
				}
			});

			//change select tipo alojamiento
			$('#edit-field-tipo-alojamiento-und').change(function() {

				if($(this).val() == 'albergue'){
					
					$('#fieldset-progama-actividad').hide();
					$('#fieldset-descripcion-actividad').hide();

				} else {
					// es refugio
					$('#fieldset-progama-actividad').show();
					$('#fieldset-descripcion-actividad').show();
				}
			});

		}

	});


})(jQuery);
;
/**
 * @file
 * Defines the behavior of the paragraphs toggle.
 */
(function($, Drupal){

  /**
   * Slide down press conference home widget.
   */
  function custom_drpl_press_conference_home_hide() {
      $('.home_rueda_prensa .rueda_prensa').removeClass('visible');
      $('.home_rueda_prensa .rueda_prensa').slideUp();
      $('.home_rueda_prensa .icono_rueda_prensa').removeClass('desplegado');
      $('.pa_menulink_home, .par_buscador_home, .par_encabezado_home, .par_rsociales_home, #10, .multipledivs').css("display","block");
      $('.front .custom_img_low').css("height","500px");
      jwplayer("jwplayer_reproduction-1").stop();
  }

  /**
   * Stop press conference home behaviour after a live event.
   */
  function custom_drpl_press_conference_home_stop() {
    custom_drpl_press_conference_home_hide();
    $('#custom_drpl_home_rueda_prensa').html("");
    $('.par_encabezado_home').removeClass("ruedaprensa2");
  }

  function custom_drpl_rueda_prensa_behaviours() {
    if ($('#jwplayer_reproduction-1').length) {
      $('.par_encabezado_home').addClass("ruedaprensa2");
      $('.home_rueda_prensa .rueda_prensa').slideUp();
      $('.home_rueda_prensa .icono_rueda_prensa .directo').click(function(event) {
        if ($('.home_rueda_prensa .rueda_prensa').hasClass('visible')) {
          custom_drpl_press_conference_home_hide();
        }
        else {
          $('.home_rueda_prensa .rueda_prensa').addClass('visible');
          $('.home_rueda_prensa .rueda_prensa').hide().slideDown();
          $('.home_rueda_prensa .icono_rueda_prensa').addClass('desplegado');
          $('.pa_menulink_home, .par_buscador_home, .par_encabezado_home, .par_rsociales_home, #10, .multipledivs').css("display", "none");
          $('.front .custom_img_low').css("height","0");
          jwplayer("jwplayer_reproduction-1").play();
        }
      });
    }

    if ($('.home_rueda_prensa .icono_rueda_prensa').length ) {
      if ($('#jwplayer_reproduction-1').length  && $('.home_rueda_prensa .element-invisible').length) {
        $('.front .par_encabezado_home').addClass("ruedaprensa2");
        jwplayer("jwplayer_reproduction-1").stop();
      }
    }
  }

  $( document ).ready(function() {

    custom_drpl_rueda_prensa_behaviours();

    var valueSelected = $(".field-name-field-tipo-de-paragraph select").val();
    if (valueSelected == 'block_adel_buscador_sinfiltros') {
      $('.field-name-field-show-read-more-button input .form-checkbox').attr('checked', false);
      $('.field-name-field-show-read-more-button').hide();
    }
    else{
      $('.field-name-field-show-read-more-button').show();
    }

    $('.gtranslate').click(function(event) {
      //$.cookie('Drupal.visitor.vid', null);
      $.cookie("Drupal.visitor.vid", null, { path: '/' });

      $('#edit-cadena').val('');
    });

    //Add language class to body
    var claseIdioma = "lang_" + document.documentElement.lang;
    $('body').addClass(claseIdioma);

    //$('.sharethis-wrapper').addClass('rs_preserve');
    var rsb = document.getElementById('readspeaker_button1');
    if(rsb != null){
      document.getElementById('readspeaker_button1').classList.remove('rs_preserve');
    }

    window.rsConf = {general: {usePost: true}};

    // Get readspeaker href link.
    var enlaceReadSpeaker = $('#readspeaker_button1 a').attr("href");


    if (enlaceReadSpeaker != null){
        // Change a property.
        auxenlaceReadSpeaker = enlaceReadSpeaker.replace('readid=body','readclass=line');
        auxenlaceReadSpeaker = auxenlaceReadSpeaker.replace('http://app.eu.readspeaker.com','//app-eu.readspeaker.com');

        // Change correct language.
        switch (document.documentElement.lang) {
            case 'en':
                auxenlaceReadSpeaker = auxenlaceReadSpeaker.replace('es_es','en_uk');
                break;
            default:
                auxenlaceReadSpeaker = auxenlaceReadSpeaker;
        }

        var auxUrl = decodeURIComponent(auxenlaceReadSpeaker);
        var lAuxUrl = auxUrl.split('&');
        var lAuxUrlFinal = [];


        $.each( lAuxUrl, function( index, value ){
            var lValue = value.split('=');

            if(lValue[0] == 'url'){

                lValue[1] = encodeURIComponent(window.location.href);
            }

            lAuxUrlFinal.push(lValue[0] + '=' + lValue[1]);
        });

        auxenlaceReadSpeaker = lAuxUrlFinal.join('&');

        // Set readspeaker href link.
        $('#readspeaker_button1 a').attr("href", auxenlaceReadSpeaker);
    }



    var pathname = Drupal.checkPlain(window.location.pathname);
    var links = $('a[href="' + pathname + '"]').click(function(event) {
      if ( pathname.indexOf('/admin/') == -1
        && pathname.indexOf('/buscar') == -1
        && pathname.indexOf('/buscador') == -1
        && pathname.indexOf('/publicamadrid') == -1
        && pathname.indexOf('/publicamadrid2') == -1){
        event.preventDefault();
      }
    });
  });
  Drupal.behaviors.GovermentAgendaDate = {
    attach: function (context, settings) {
      //Date
      if ($(".view-display-id-goverment_agenda_block").length > 0) {
        if ($(".views-widget-filter-field_date_value").length > 0 && $(".views-widget-filter-field_date_value2").length > 0) {
          $('input#edit-field-date-value-value-datepicker-popup-0').change(function(){
            var field_date1 = $('input#edit-field-date-value-value-datepicker-popup-0').val();
            $('input#edit-field-date-value2-value-datepicker-popup-0').val(field_date1);
          });
        }
      }
    }
  };
  Drupal.behaviors.GovermentPresidentClass = {
    attach: function (context, settings) {
      if($('.view-display-id-goverment_agenda_block').length > 0){
        $(".view-display-id-goverment_agenda_block .view-content .views-row").each(function(){
          var president = $(this).find('.field-name-field-counselings .field-item');
          if (president[0]) {
            president = president[0].innerHTML.toLowerCase();
          }
          if (president == 'la presidenta') {
            $(this).closest(".views-row").addClass("special-section");
          }
        });
      }
    }
  };
  Drupal.behaviors.DRPLCustomEqualHeightComponents = {
    attach: function (context, settings) {
      if ($(".view-mode-block_teaser_horizontal, .view-mode-block_teaser, .view-mode-video_thumbnail, .view-display-id-widget_last_video .view-mode-teaser, .view-display-id-widget_last_press_conference .view-mode-full_video_text, .view-display-id-press_conferences_history .view-mode-block_teaser_horizontal").length > 0) {
        // Image
        var image_default = Drupal.settings.settings.path_theme + "/img/default-image.jpg";
        var image_width = '880';
        var image_height = '495';
        $(".view-mode-block_teaser_horizontal, .view-mode-block_teaser, .view-mode-video_thumbnail, .view-display-id-widget_last_video .view-mode-teaser, .view-display-id-widget_last_press_conference .view-mode-full_video_text, .view-display-id-press_conferences_history .view-mode-block_teaser_horizontal").each(function(){
          //If is block goverment_agenda then return;
          var press_releases = $(this).find('.press_releases_block_teaser');
          var goverment_agenda = $(this).find('.goverment_agenda_block_teaser');
          if (goverment_agenda.length < 1 && press_releases.length < 1) {
            //If block not have img
            var image = $(this)[0].getElementsByTagName('img')[0];
            var video = $(this)[0].getElementsByTagName('video')[0];
            if (!image && !video) {
              var url_item = $(this)[0].getElementsByTagName('a')[0];
              if (url_item) {
                url_item = url_item.getAttribute("href");
                var image_url = url_item;
              }
              if (image_url) {
                var html = '<div class="field field-name-field-images field-type-image field-label-hidden default-image"><div class="field-items"><div class="field-item even"><img typeof="foaf:Image" class="img-responsive" src="'+image_default+'" width="'+image_width+'" height="'+image_height+'" alt="Default image" title="Default image"></div></div></div>';
                var text_information = $(this).find('.group-text-information');
                if (text_information) {
                  $(html).insertBefore(text_information);
                }
              }
            }
          }
        });
      }
      if ($(".view-display-id-widget_last_videos .view-mode-video_thumbnail_title").length > 0) {
        var image_default = Drupal.settings.settings.path_theme + "/img/default-image.jpg";
        var image_width = '880';
        var image_height = '495';
        $(".view-display-id-widget_last_videos .view-mode-video_thumbnail_title").each(function(){
          //If is block goverment_agenda then return;
          var goverment_agenda = $(this).find('.goverment_agenda_block_teaser');
          if (goverment_agenda.length < 1) {
            //If block not have img
            var image = $(this)[0].getElementsByTagName('img')[0];
            var video = $(this)[0].getElementsByTagName('video')[0];
            if (!image && !video) {
              var url_item = $(this)[0].getElementsByTagName('a')[0];
              if (url_item) {
                url_item = url_item.getAttribute("href");
                var image_url = url_item;
              }
              if (image_url) {
                var html = '<div class="group-left-column field-group-div col-md-6"><div class="field field-name-field-images field-type-image field-label-hidden default-image"><div class="field-items"><div class="field-item even"><img typeof="foaf:Image" class="img-responsive" src="'+image_default+'" width="'+image_width+'" height="'+image_height+'" alt="Default image" title="Default image"></div></div></div></div>';
                var text_information = $(this).find('.group-right-column');
                if (text_information) {
                  $(html).insertBefore(text_information);
                }
              }
            }
          }
        });
      }
      //Goverment agenda counseling
      if ($(".view-id-goverment_agenda_search").length > 0) {
        //Create divs in search api if not exists
        var counseling = '<div class="field field-name-field-counselings field-type-taxonomy-term-reference field-label-hidden"></div>';
        $(".view-id-goverment_agenda_search .view-content > div").each(function(){
          var field_counselings = $(this).find('.field-name-field-counselings');
          if (!field_counselings[0]) {
            var date = $(this).find('.field-name-field-date');
            if (date) {
              $(counseling).insertAfter(date);
            }
          }
        });
      }
      //Press releases
      if ($(".paragraphs-item-list-press-releases").length > 0) {
        //Create divs in search api if not exists
        var description = '<div class="field field-name-field-short-description-single no-short-description field-type-ds field-label-hidden"><div class="field-text"></div></div>';
        $(".paragraphs-item-list-press-releases .node-press-releases").each(function(){
          var field_short_description = $(this).find('.field-name-field-short-description-single');
          if (!field_short_description[0]) {
            var column = $(this).find('.field-name-title');
            if (column) {
              $(description).insertAfter(column);
            }
          }
        });
      }
      //News search
      if ($(".view-id-news_search").length > 0) {
        var image_default = Drupal.settings.settings.path_theme + "/img/default-image.jpg";
        var image_width = '880';
        var image_height = '495';
        $(".view-id-news_search .view-content > div").each(function(){
          //If block not have img
          var image = $(this)[0].getElementsByTagName('img')[0];
          var video = $(this)[0].getElementsByTagName('video')[0];
          if (!image && !video) {
            var url_item = $(this)[0].getElementsByTagName('a')[0];
            if (url_item) {
              url_item = url_item.getAttribute("href");
              var image_url = url_item;
            }
            if (image_url) {
              var html = '<div class="group-left-column field-group-div col-md-4"><div class="field field-name-field-images field-type-image field-label-hidden default-image"><div class="field-items"><div class="field-item even"><img typeof="foaf:Image" class="img-responsive" src="'+image_default+'" width="'+image_width+'" height="'+image_height+'" alt="Default image" title="Default image"></div></div></div></div>';
              var text_information = $(this).find('.group-right-column');
              if (text_information) {
                $(html).insertBefore(text_information);
              }
            }
          }
        });
      }
      /*
      if ($(".view-id-press_releases_search").length > 0) {
        //Create divs in search api if not exists
        var counseling = '<div class="group-left-column field-group-div col-md-3"><div class="field field-name-field-counselings field-type-taxonomy-term-reference field-label-hidden"></div></div>';
        $(".view-id-press_releases_search .view-content > div").each(function(){
          var field_counselings = $(this).find('.field-name-field-counselings');
          if (!field_counselings[0]) {
            var column = $(this).find('.group-right-column');
            if (column) {
              $(counseling).insertBefore(column);
            }
          }
        });
      }*/
      //Search
      if ($(".search-api-page-results .search-results").length > 0 || $(".view-id-press_conferences .view-content > div").length > 0 || $(".view-id-press_conferences_search .view-content > div").length > 0) {
        //Create divs in search api if not exists
        var date_wrapper = '<div class="field field-name-field-date field-type-date field-label-hidden"></div>';
        var description_wrapper = '<div class="field field-name-field-short-description-single no-short-description field-type-ds field-label-hidden"></div>';
        $(".search-api-page-results .search-results > div, .view-id-press_conferences .view-content > div, .view-id-press_conferences_search .view-content > div").each(function(){
          //Unify images and video header block
          var file_type_image = $(this).find('.field-name-field-videos');
          var file_type_video = $(this).find('.field-name-field-images');
          var field_date = $(this).find('.field-name-field-date');
          var field_short_description = $(this).find('.field-name-field-short-description-single');
          if (file_type_image[0]) {
            $(file_type_image).addClass("file-type-object");
          }
          if (file_type_video[0]) {
            $(file_type_video).addClass("file-type-object");
          }
          if (!field_date[0]) {
            var title = $(this).find('.field-name-title');
            if (title) {
              $(date_wrapper).insertAfter(title);
            }
          }
          if (!field_short_description[0]) {
            var date = $(this).find('.field-name-field-date');
            if (date) {
              $(description_wrapper).insertAfter(date);
            }
          }
        });
      }
    }
  };
  //BUG FIXID WINDOW LOAD LINE 21
  Drupal.behaviors.equalHeightsModule = {
    attach: function (context, settings) {
      if (Drupal.settings.equalHeightsModule) {
        var eqClass = Drupal.settings.equalHeightsModule.classes;
      }
      if (eqClass) {
        var equalHeightsWindowSize = 640;
        $( window ).on( "load", function() {
          if ($(window).width() >= equalHeightsWindowSize) {
            equalHeightsTrigger();
          }
        });
        $(window).bind('resize', function () {
          if ($(window).width() >= equalHeightsWindowSize) {
            equalHeightsTrigger();
          }
          else {
            equalHeightsTriggerRemove();
          }
        });
        $(document).ajaxSuccess(function(){
          if ($(window).width() >= equalHeightsWindowSize) {
            equalHeightsTrigger();
          }
        });
      }
      function equalHeightsTriggerRemove() {
        $.each(eqClass, function(eqClass, setting) {
          var target = $(setting.selector);
          target.css('height', '');
          target.css('overflow', '');
        });
      }
      function equalHeightsTrigger() {
        $.each(eqClass, function(eqClass, setting) {
          var target = $(setting.selector);
          var minHeight = setting.minheight;
          var maxHeight = setting.maxheight;
          var overflow = setting.overflow;
          target.css('height', '');
          target.css('overflow', '');

          // Disable equalheights not matching the mediaquery
          var mediaQuery = setting.mediaquery;
          var matchMedia = window.matchMedia;
          if (mediaQuery) {
            if (matchMedia && !matchMedia(mediaQuery).matches) {
                return;
              } else {
                equalHeightsLoad(target, minHeight, maxHeight, overflow);
              }
            } else {
              equalHeightsLoad(target,minHeight, maxHeight, overflow);
          }
        });
      }
      function equalHeightsLoad(target, minHeight, maxHeight, overflow) {
          // disable imagesloaded for IE<=8
          var imagesLoadedIE8 = Drupal.settings.equalHeightsModule.imagesloaded_ie8;
          if (imagesLoadedIE8 && window.attachEvent && !window.addEventListener) {
              target.equalHeights(minHeight, maxHeight).css('overflow', overflow);
          } else {
          // imagesloaded library checks if all images are loaded before callback
           target.imagesLoaded({
           callback: function($images, $proper, $broken) {
             this.equalHeights(minHeight, maxHeight).css('overflow', overflow)
           }
          });
          }
      }

    }
  }
  Drupal.behaviors.DRPLCustomRelatedContent = {
    attach: function (context, settings) {
      //If block related content exist but it dosnt have any assigned nodes, then hide this panel title block
      if ($(".pane-custom-drpl-custom-drpl-related-content").length > 0) {
        $(".pane-custom-drpl-custom-drpl-related-content").each(function(){
          //Check if is separator or field
          var related_content = $(this).find(".related_content");
          var panel_title = $(this).find(".pane-title");
          if (related_content[0]) {
            related_content = related_content[0].innerHTML;
            if (related_content === "") {
              panel_title[0].innerHTML = '';
            }
          }
        });
      }
    }
  };
  Drupal.behaviors.DRPLCustomFormRegisterEvents = {
    attach: function (context, settings) {
      if ($(".hide-form-register-event").length > 0 && $(".pane-entityform-block-events-suscription").length > 0) {
        $('.pane-entityform-block-events-suscription').remove();
      }
    }
  };

  /**
   * Data related to current press conference.
   */
  Drupal.DRPLCustomPressConference = {
    // Is the press conference enabled.
    enabled: false,
    // Current interval to check press conference is on live or not, it starts
    // when press conference start date match with current date and stops
    // when press conference end date match with current date.
    interval: null,
    press_conference_old_content: []
  }

  Drupal.behaviors.DRPLGroupsFields = {
    attach: function (context, settings) {
      $('body', context).once('section-group', function () {
        var u = 0;
        var groups = [];
        $(".section-menu").each(function(){
          var id = $(this)[0].id;
          var classes = $(this)[0].className.split(' ');
          if (classes) {
            for(var i = 0, j = classes.length; i < j; i++) {
              if(classes[i].indexOf("group_") !== -1) {
                groups[u] = [];
                groups[u]['class_group'] = classes[i];
                groups[u]['id_group'] = id;
                $(this).removeClass("section-menu");
                $(this).removeAttr('id')
                u++;
              }
            }
          }
        });
        if (groups.length > 0) {
          for(var i = 0, j = groups.length; i < j; i++) {
            $("."+groups[i]['class_group']).wrapAll( "<div id='"+groups[i]['id_group']+"' class='section-menu panel_group_items group_items_"+groups[i]['class_group']+"' />");
          }
        }
      });
    }
  };

  Drupal.behaviors.DRPLSliderMenuFromSomeContentTypes = {
    attach: function (context, settings) {
      var self = this;
      $('.pane-custom-drpl-custom-drpl-slider-menu-fields .menu_slider', context).once('menu-slider', function () {
        self.appendItemSelectorTitleToSectionMenuItem('.pane-custom-drpl-custom-drpl-slider-menu-fields', '.section-menu', context);
      });
    },
    appendItemSelectorTitleToSectionMenuItem: function (slider_menu_container, item_selector, context) {
      $(item_selector).each(function() {
        var id = $(this)[0].id;
        // Check if is separator or field.
        var type_separator = $(this).find(".paragraphs-item-separator");
        if (type_separator[0] != null) {
          var title_obj = $(this).find(".field-item");
        }
        else {
          var title_obj = $(this).find(".pane-title");
        }
        if (title_obj[0] != null) {
          var title = title_obj[0].innerHTML;
        }
        if (title && id) {
          if (title.indexOf(":") !== -1) {
            title = title.split(":")[0];
          }
          title = title.replace(/<(?:.|\n)*?>/gm, '');
          var html = '<div class="bar"><a href="#'+id+'">'+title+'</a><span></span></div>';
          $(slider_menu_container + " .menu_slider > .wrapper").append(html);
        }
      });
    }
  };

  Drupal.behaviors.DRPLSliderMenuTop = {
    attach: function (context, settings) {
      $('.pane-custom-drpl-custom-drpl-slider-menu-top .menu_slider', context).once('menu-slider-top', function () {
        Drupal.behaviors.DRPLSliderMenuFromSomeContentTypes.appendItemSelectorTitleToSectionMenuItem('.pane-custom-drpl-custom-drpl-slider-menu-top', '.section-menu-top', context);
      });
    }
  };

  Drupal.behaviors.DRPLFieldsMenuScroll = {
    attach: function (context, settings) {
      $('.fields-menu-progress', context).once('menu-slider-progress', function () {
        var wrapper_top = $(".fields-menu-progress .wrapper").offset().top;
        $(window).scroll(function (){
          var top = $(this).scrollTop() - 60;
          var scroll_bottom = top + $(window).height();
          if (top > wrapper_top - 10) {
            $(".fields-menu-progress .wrapper").addClass("affix");
          }
          else {
            $(".fields-menu-progress .wrapper").removeClass("affix");
          }
          $(".col-content .section-menu, .col-content .section-menu-top").each(function(i){
            var this_top = $(this).offset().top;
            var height = $(this).height();
            var id = $(this)[0].id;
            var this_bottom = this_top + height;
            var percent = 0;
            // Use window bottom to set beginning/end of the sections reading.
            if (scroll_bottom >= this_top && scroll_bottom <= this_bottom) {
              percent = 100 + ((scroll_bottom - this_bottom) / height * 100);
              if (percent >= 100) {
                percent = 100;
                $(".fields-menu-progress .wrapper .bar:eq("+i+") i").css("color", "#D10002");
              }
              else {
                $(".fields-menu-progress .wrapper .bar:eq("+i+") i").css("color", "#36a7f3");
              }
            }
            else if (scroll_bottom > this_bottom) {
              percent = 100;
              $(".fields-menu-progress .wrapper .bar:eq("+i+") i").css("color", "#D10002");
            }
            $(".fields-menu-progress .wrapper .bar:eq("+i+") span").css("width", percent + "%");
          });
        });
        // Smooth Scroll Links
        $(".fields-menu-progress .wrapper .bar a").click(function (e){
          e.preventDefault();
          var hash = this.hash.substr(1);
          $('html, body').animate({
            scrollTop: $("#"+ hash).offset().top - 55
          }, 500);
        });
      });
    }
  };
  Drupal.behaviors.DRPLCustomGalleryTitle = {
    attach: function (context, settings) {

      insertImageTitle('.view-mode-gallery a', context);
      insertImageTitle('.pane-node-field-gallery a', context);

      /**
       * Insert image title.
       *
       * @param string selector
       *   Wrapper element selector.
       * @param object context
       *   Context
       * @returns {undefined}
       */
      function insertImageTitle(selector, context) {
        $(selector, context).once('insert-title', function () {
          var $element = $(this);
          var $image = $(this).find('img');
          var image_title = $image.attr('title');
          $('<div class="image-caption-title-hover image-caption-hidden"> ' + image_title + '</div>').insertAfter($image);

          toggleClassOnHover($element, '.image-caption-title-hover', 'image-caption-hidden');

          /**
           * Toggle css class to element on hover.
           *
           * @param string hoverElement
           *   Hover element.
           * @param string elementClass
           *   Element class
           * @param string cssClass
           *   Class to toggle.
           */
          function toggleClassOnHover(hoverElement, elementClass, cssClass) {
            $(hoverElement).on("mouseover", function(e) {
              $(this).find(elementClass).removeClass(cssClass);
            }).on("mouseout", function(e) {
              $(this).find(elementClass).addClass(cssClass);
            });
          }
        });
      }
    }
  };
  Drupal.behaviors.DRPLCustomImageSize = {
    attach: function (context, settings) {
      if ($(".image-content-feature").length > 0) {
        $(".image-content-feature").each(function(){
          var img = $(this);
          var image = img[0].getElementsByTagName('img')[0];
          if (image.width < 400) {
            img.addClass('imagen-nowidth');
          }
          else{
            img.addClass('imagen-width');
          }
        });
      }
    }
  };
  Drupal.behaviors.DRPLCustomSearchPage = {
    attach: function (context, settings) {
      if ($(".search-api-page-results").length > 0) {
        $(".search-api-page-results ol > div").each(function(){
          $(this).addClass('col-md-3');
        });
      }
    }
  };
  Drupal.behaviors.DRPLCustomCustomGallery = {
    attach: function (context, settings) {
      if ($(".custom-gallery-field").length > 0) {
        $(".custom-gallery-field .field-item").each(function(){
          $(this).addClass('col-md-3');
        });
      }
    }
  };
  Drupal.behaviors.DRPLCustomTopImage = {
    attach: function (context, settings) {
      if ($(".panel-twocol-15-85-stacked .col-top").length > 0) {
        if ($(".panel-twocol-15-85-stacked .col-top .pane-node-field-images").length < 1) {
          var coltop = document.getElementsByClassName("col-top");
          if (coltop[0]) {
            //coltop[0].className += " no-top-image";
          }
        }
      }
    }
  };
  Drupal.behaviors.DRPLCustomCarouselTopImage = {
    attach: function (context, settings) {
      var selector = ".col-top .pane-node-field-images .field-name-field-images";
      if ($(selector).length > 0) {
        customdrpl_resize_images(selector)
      }
      function customdrpl_resize_images(selector, type_resize) {
        var u = 0;
        $(selector).each( function( i, elem ) {
          var elem = $(elem);
          elem.imagesLoaded( function() {
            var imgs = elem.find('img');
            for(u = 0; u < imgs.length; u++) {
              var imgSrc = $(imgs[u]).attr('src');
              var type_image = 'low';
              var ratio = $(imgs[u]).height() / $(imgs[u]).width();
              if (ratio > 0.40) {
                type_image = 'high';
              }
              customdrpl_resize_images_apply(imgs[u], imgSrc, u, i, type_image);
            }
          });
        });
      }
      function customdrpl_resize_images_apply(selector, imgSrc, row, row_selector, type_image) {
        $(selector).parent().addClass('custom_img_'+type_image);
        $(selector).after("<div class='image-"+type_image+" csimgbackbg csbackbg-"+row_selector+'-'+row+"'></div>");
        $(selector).remove();
        $('.csbackbg-'+row_selector+'-'+row).css('background-image', 'url(' + imgSrc + ')');
        $('.csbackbg-'+row_selector+'-'+row).css('background-position', '50% 50%');
        $('.csbackbg-'+row_selector+'-'+row).css('background-size','cover');
        $('.csbackbg-'+row_selector+'-'+row).css('width','100%');
        $('.csbackbg-'+row_selector+'-'+row).css('height','100%');
      }
    }
  };
  Drupal.behaviors.DRPLCustomGovernmentAgreementsFilesSearch = {
    attach: function (context, settings) {
      function drplparagraphsdaysofyears(year) {
        return drplparagraphsleapyeardays(year) ? 366 : 365;
      }
      function drplparagraphsleapyeardays(year) {
        return year % 400 === 0 || (year % 100 !== 0 && year % 4 === 0);
      }
      function drplparagraphsgetmonthname(month) {
        var monthNames = [
          "January",
          "February",
          "March",
          "April",
          "May",
          "June",
          "July",
          "August",
          "September",
          "October",
          "November",
          "December"
        ];
        return monthNames[month];
      }
      if ($(".government_agreements_files_searchs_block").length > 0){
        var files_search_block = $("#custom_drpl_gover_agreements [id*='k_id_']");
        var today = new Date();
        var dd = today.getDate();
        var mm = today.getMonth()+1;
        var yyyy = today.getFullYear();
        if(dd<10) {dd='0'+dd}
        if(mm<10) {mm='0'+mm}
        today = yyyy+'-'+mm+'-'+dd;
        for(i = 0; i < files_search_block.length; i++){
          var files_search_block_id = $(files_search_block[i]).attr('id').split('government_agreements_files_searchs_block_id_')[1];
          $("#government_agreements_files_searchs_block_id_"+files_search_block_id+" .date-arrow").click(function(){
            var parent = $(this).parent().parent().parent();
            if (parent[0].className == 'date-start') {
              var input = '.form-item-date-filter-value-date';
            }
            var paragraph = $(this).closest(".group-paragraph");
            var date = parent.attr('date');
            var type = $(this).attr('type');
            var action = $(this).attr('action');
            //CONVERT DATES
            if (date && type && action) {
              var date_split = date.split('-');
              var date_year = date_split[0];
              var date_month = date_split[1];
              var date_day = date_split[2];
              var valor_date = new Date(date);
              if (type == 'days') {
                if (action == '+') {
                  valor_date.setDate(valor_date.getDate() + 1);
                }
                else{
                  valor_date.setDate(valor_date.getDate() - 1);
                }
              }
              if (type == 'month') {
                //New month
                if (action == '+') {
                  var new_month = parseInt(date_month)+1;
                }
                else{
                  var new_month = parseInt(date_month)-1;
                }
                //Current month
                var date_current_month_last_day = new Date(valor_date.getFullYear(), valor_date.getMonth() + 1, 0);
                date_current_month_last_day = date_current_month_last_day.getDate();
                var new_month_selected  = new Date(date_year+'-'+new_month+'-'+01);
                var new_last_day_month = new Date(new_month_selected.getFullYear(), new_month_selected.getMonth() + 1, 0);
                new_last_day_month = new_last_day_month.getDate();
                if (date_day > new_last_day_month) {
                  valor_date = new Date(date_year+"-"+new_month);
                }
                else{
                  if (action == '+') {
                    valor_date.setMonth(valor_date.getMonth() + 1);
                  }
                  else{
                    valor_date.setMonth(valor_date.getMonth() - 1);
                  }
                }
              }
              if (type == 'year') {
                if (action == '+') {
                  valor_date.setFullYear(valor_date.getFullYear() + 1);
                }
                else{
                  valor_date.setFullYear(valor_date.getFullYear() - 1);

                }
              }
              var response_month = ('0' + (valor_date.getMonth()+1)).slice(-2);
              var response_year = valor_date.getFullYear();
              var response_date = response_year+'-'+response_month;
              parent.attr('date', response_date);
              parent.find(".month")[0].innerHTML = Drupal.t(drplparagraphsgetmonthname(parseInt(response_month) -1));
              parent.find(".year")[0].innerHTML = response_year;
            }
          });
          $("#government_agreements_files_searchs_block_id_"+files_search_block_id+" .showall").click(function(){
            var parent = $(this).parent().parent();
            var date = parent.attr('date');
            $.ajax({
              url: settings.basePath + 'government_agreements_files_showall_script_ajax',
              type: 'GET',
              data: {date: date},
              success: function(response) {
                document.getElementById("government_agreements_files_searchs_block_list_"+files_search_block_id).innerHTML = response['list'];
              },
              dataType: 'json'
            });
          });
        }
      }
    }
  };
  Drupal.behaviors.DRPLParagrapAdelHideField = {
    attach: function (context, settings) {
      //code starts
      $(".field-name-field-tipo-de-paragraph select").change(function() {
        var valueSelected = $(".field-name-field-tipo-de-paragraph select").val();
          if (valueSelected == 'block_adel_buscador_sinfiltros') {
            $('.field-name-field-show-read-more-button input .form-checkbox').attr('checked', false);
            $('.field-name-field-show-read-more-button').hide();
          }
          else{
            $('.field-name-field-show-read-more-button').show();
          }
      });
      //code ends
  }
};
$(document).ajaxError(function (event, jqxhr, settings, exception) {
  if (jqxhr.status === 500) { // Código de error HTTP
    alert('Ha ocurrido un error. Si el error persiste por favor contacte con el administrador del sitio.');
    window.location.href = window.location.pathname;
  }
});
})(jQuery, Drupal);
;
