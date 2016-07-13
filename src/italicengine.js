/**
 * @license Copyright (c) 2003-2016, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md.
 */

'use strict';

import Feature from '../feature.js';
import buildModelConverterFor from '../engine/conversion/model-converter-builder.js';
import buildViewConverterFor from '../engine/conversion/view-converter-builder.js';
import AttributeCommand from '../command/attributecommand.js';

const ITALIC = 'italic';

export default class ItalicEngine extends Feature {
	init() {
		const editor = this.editor;
		const data = editor.data;
		const editing = editor.editing;

		// Allow italic attribute on all inline nodes.
		editor.document.schema.allow( { name: '$inline', attributes: [ ITALIC ] } );

		// Build converter from model to view for data and editing pipelines.
		buildModelConverterFor( data.modelToView, editing.modelToView )
			.fromAttribute( ITALIC )
			.toElement( 'em' );

		// Build converter from view to model for data pipeline.
		buildViewConverterFor( data.viewToModel )
			.fromElement( 'em' )
			.fromElement( 'i' )
			.fromAttribute( 'style', { 'font-style': 'italic' } )
			.toAttribute( ITALIC, true );

		// Create italic command.
		editor.commands.set( ITALIC, new AttributeCommand( editor, ITALIC ) );
	}
}
