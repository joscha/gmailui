(->

	s = document.createElement 'script'
	s.setAttribute 'src','//cdnjs.cloudflare.com/ajax/libs/yepnope/1.5.4/yepnope.min.js' # We use yepnope to load dependencies
	s.onload = ->
		yepnope
			load: [
					'//cdnjs.cloudflare.com/ajax/libs/jquery/1.8.3/jquery.min.js' # GMailUI depends on jQuery
					'//cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.3/underscore-min.js' # GMailUI depends on underscore
					'//raw.github.com/joscha/eventr/master/lib/Eventr.js' # This is used to trigger the GMail compose button - not necessarily needed by GMailUI
					'//raw.github.com/joscha/gmailui/master/lib/GMailUI.js' # Load GMailUI
					'//raw.github.com/joscha/gmailui/master/lib/example/decorate.js' # Load the code that uses GMailUI
					]
			complete: ->
				console.log "GMailUI and all dependencies have been loaded successfully, let's have some fun :-)"

				# GMail elements
				composeButton = ($ "[gh='cm'][role='button']").get 0
				buttonBar = $ "[gh='mtb'] > div > div"

				if buttonBar.length > 0
					bar = decorateGMail jQuery, _, composeButton
					buttonBar.first().append bar
				else
					alert 'Are you sure you are in the GMail webapp when clicking the bookmarklet?'
				return

	document.getElementsByTagName('body')[0].appendChild s
	return
)()