/**
 * @@pkg.title
 */

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
	width="18"
	height="14"
	viewBox="0 0 18 14"
	>
	<g><path d="M0,0 L18,0 L18,14 L0,14 L0,0 Z M2,2.03271484 L2,12.0327148 L16,12.0327148 L16,2.03271484 L2,2.03271484 Z"></path></g>
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
		space: {
			type: 'number',
			default: 50,
		},
	},

	edit( { attributes, setAttributes, focus, className } ) {

		const { space } = attributes;

		const inspectorControls = focus && (
			<InspectorControls key="inspector">
				<BlockDescription>
					<p>{ __( 'Add a vertical spacer between blocks.' ) }</p>
				</BlockDescription>
				<RangeControl
					label={ __( 'Space' ) }
					value={ space || '' }
					onChange={ ( value ) => setAttributes( { space: value } ) }
					min={ 30 }
					max={ 600 }
				/>
			</InspectorControls>
		);

		const focusControls = focus && (
			<form
				key="form-range"
				className="blocks-spacer__range"
				onSubmit={ ( event ) => event.preventDefault() }>
				<RangeControl
					value={ space }
					onChange={ ( value ) => setAttributes( { space: value } ) }
					min={ 30 }
					max={ 600 }
				/>
			</form>
		);

		return [
			focusControls,
			inspectorControls,
			<div className={ className } style={ { height: space ? space + 'px' : undefined } }></div>,
		];
	},

	save( { attributes, className } ) {

		const { space } = attributes;

		return (
			<div className={ className } style={ { height: space ? space + 'px' : undefined } }></div>
		);
	},
} );
