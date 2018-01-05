/**
 * @@pkg.title
 */

import ResizableBox from 're-resizable';

const { __ } = wp.i18n;
const { Toolbar, PanelBody, PanelColor, Dashicon, IconButton } = wp.components;
const InspectorControls = wp.blocks.InspectorControls;
const { RangeControl, ToggleControl, SelectControl } = InspectorControls;

const {
	registerBlockType,
	Editable,
	BlockControls,
	AlignmentToolbar,
	BlockDescription,
	UrlInput,
	ColorPalette,
	source
} = wp.blocks;

const blockAttributes = {
	space: {
		type: 'number',
		default: 100,
	},
};

const icon = [
	<svg
	aria-hidden
	role="img"
	focusable="false"
	className="dashicon"
	xmlns="http://www.w3.org/2000/svg"
	width="20"
	height="20"
	viewBox="0 0 20 20"
	>
	<g>
		<path d="M0,3 L20,3 L20,17 L0,17 L0,3 Z M2,5.03271484 L2,15.0327148 L18.001709,15.0327148 L18.001709,5.03271484 L2,5.03271484 Z"></path>
	</g>
	</svg>
]

/**
 * Register Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made available as an option to any
 * editor interface where blocks are implemented.
 *
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType( 'gutenkit/spacer', {
	title: __( 'Spacer' ),
	icon: icon,
	category: 'common',
	keywords: [ __( 'space' ) ],
	attributes: {
		height: {
			type: 'number',
			default: 50,
		},
	},

	edit( { attributes, setAttributes, focus, className, settings, toggleSelection } ) {

		const { height } = attributes;

		const inspectorControls = focus && (
			<InspectorControls key="inspector">
				<BlockDescription>
					<p>{ __( 'Add a vertical spacer between blocks.' ) }</p>
				</BlockDescription>
				<RangeControl
					label={ __( 'Height' ) }
					value={ height || '' }
					onChange={ ( value ) => setAttributes( { height: value } ) }
					min={ 30 }
					max={ 800 }
				/>
			</InspectorControls>
		);

		return [

			inspectorControls,
			<ResizableBox
				size={ {
					width: '100%',
					height: height,
				} }
				minWidth= { '100%' }
				maxWidth= { '100%' }
				minHeight= { '100%' }
				handleClasses={ {
					bottomLeft: 'gutenkit-block-spacer__resize-handler-bottom-left',
				} }
				enable={ { top: false, right: false, bottom: true, left: false, topRight: false, bottomRight: false, bottomLeft: true, topLeft: false } }
				onResizeStart={ () => {
					toggleSelection( false );
				} }
				onResizeStop={ ( event, direction, elt, delta ) => {
					setAttributes( {
						height: parseInt( height + delta.height, 10 ),
					} );
					toggleSelection( true );
				} }
			>
			</ResizableBox>
		];
	},

	save( { attributes, className } ) {

		const { height } = attributes;

		return (
			<div className={ className } style={ { height: height ? height + 'px' : undefined } }></div>
		);
	},
} );
