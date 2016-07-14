/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Feature from '../feature.js';
import BuildModelConverterFor from '../engine/conversion/model-converter-builder.js';
import BuildViewConverterFor from '../engine/conversion/view-converter-builder.js';
import AttributeCommand from '../command/attributecommand.js';

const bold = 'bold';

export default class BoldEngine extends Feature {
	init() {
		const editor = this.editor;
		const data = editor.data;
		const editing = editor.editing;

		// Allow bold attribute on all inline nodes.
		editor.document.schema.allow( { name: '$inline', attributes: [ bold ] } );

		// Build converter from model to view for data and editing pipelines.
		BuildModelConverterFor( data.modelToView, editing.modelToView )
			.fromAttribute( bold )
			.toElement( 'strong' );

		// Build converter from view to model for data pipeline.
		BuildViewConverterFor( data.viewToModel )
			.fromElement( 'strong' )
			.fromElement( 'b' )
			.fromAttribute( 'style', { 'font-weight': 'bold' } )
			.toAttribute( bold, true );

		// Create bold command.
		editor.commands.set( bold, new AttributeCommand( editor, bold ) );
	}
}
