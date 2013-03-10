decorateGMail = (($, _, button) ->

	bar = new GMailUI.ButtonBar

	popup = new GMailUI.Popup

	popupButton = bar.append new GMailUI.ButtonBarPopupButton popup, '', 'GMailUI'
	
	# Folder (archive) icon
	popupButton.addClass 'ar7'

	popup.append new GMailUI.PopupLabel 'Checkboxes'

	a = popup.append new GMailUI.Section
	aBoxes =
		A: a.append (new GMailUI.PopupCheckbox 'A title', 	true, 	'A tooltip', 	'')
		B: a.append (new GMailUI.PopupCheckbox 'B', 		true,	'B tooltip', 	'')
		C: a.append (new GMailUI.PopupCheckbox 'C', 		false, 	'', 			'A looooooong title that would make no sense as a tooltip, but very much here.')

	_.each aBoxes, (checkbox, propName) ->
		checkbox.addOnChange (e, checked) ->
			console.log "#{propName} is checked: #{checked}"
			return
		return

	b = popup.append new GMailUI.Section
	b.append new GMailUI.Separator
	b.append new GMailUI.PopupLabel 'Submenu selections'

	for i in [1..2]
		presetMenu = new GMailUI.PopupMenu popup
		presetItem = b.append (new GMailUI.PopupMenuItem presetMenu, "Item #{i}", 	'', '',	true)
		for x in [1..3]
			item = new GMailUI.PopupMenuItem presetItem, "Item #{i}.#{x}", '', '', false
			onChange = (i,x) ->
				(e, checked) ->
					console.log "#{i}.#{x} was checked: #{checked}"
					return
			item.addOnChange (onChange i, x), true
			presetMenu.append item


	c = popup.append new GMailUI.Section
	c.append new GMailUI.Separator

	composeButton = c.append new GMailUI.Button 'Compose new mail'
	composeButton.on 'click', ->
		popupButton.close() # explicitly close the popup

		Eventr.simulate button, 'mousedown'
		Eventr.simulate button, 'mouseup'
		return

	dialogButton = c.append new GMailUI.Button 'Open modal dialog'
	dialogButton.on 'click', ->
		popupButton.close() # explicitly close the popup

		dialog = new GMailUI.ModalDialog 'Cupkace ipsum'

		container = dialog.append new GMailUI.ModalDialog.Container

		footer = dialog.append new GMailUI.ModalDialog.Footer
		okButton = footer.append new GMailUI.ModalDialog.Button 'OK', 'This button has no action attached'
		i = 0
		okButton.on 'click', ->
			alert "You are hard to convince, aren't you :-)" if ++i > 3
			return

		cancelButton = footer.append new GMailUI.ModalDialog.Button 'Cancel', "I don't like sweets", 'cancel'
		cancelButton.on 'click', dialog.close

		container.append	"""
							<div style="text-align: justify;">
								<img src="//upload.wikimedia.org/wikipedia/commons/5/56/Chocolate_cupcakes.jpg" data-tooltip="The Google logo" alt="Google logo" align="right" style="padding-left: 10px; width: 200px;">
								Soufflé sugar plum caramels. Fruitcake sweet roll caramels halvah gummies pastry candy canes. Cake macaroon powder jelly cake sweet roll jelly-o marzipan. Cotton candy jujubes gummies chocolate bar gingerbread lemon drops. Donut fruitcake macaroon wafer croissant. Croissant lemon drops danish macaroon. Gummies lemon drops halvah gingerbread cupcake cookie bonbon. Dragée wypas halvah
							</div>
							"""
		dialog.open()
		return

	d = popup.append new GMailUI.ErrorSection 'And here is an error message!'

	bar.getElement()
)