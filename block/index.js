/**
 * @@pkg.title
 */

import ResizableBox from 're-resizable';

/**
 * Internal Dependencies
 */
import './editor.scss';

const { __ } = wp.i18n;

const {
	registerBlockType,
	InspectorControls,
	source
} = wp.blocks;

const { RangeControl } = InspectorControls;

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

registerBlockType( 'gutenkit/spacer', {

	title: __( 'Spacer' ),

	description: __( 'Add space between other blocks.' ),

	icon: icon,

	category: 'layout',

	keywords: [ __( 'space' ), __( 'layout' ), __( 'gutenkit' ) ],

	attributes: {
		height: {
			type: 'number',
			default: 50,
		},
	},

	edit( { attributes, setAttributes, focus, toggleSelection } ) {

		const { height } = attributes;

		const inspectorControls = focus && (
			<InspectorControls key="inspector">
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
