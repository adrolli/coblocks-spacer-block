<?php
/**
 * Plugin Name: Gutenberg Spacer Block Gutenberg by GutenKit
 * Plugin URI: https://gutenkit.com
 * Description: Easily add vertical spacers to space out your blocks within the upcoming Gutenberg editor. <strong>This is a beta release.</strong>
 * Author: @@pkg.author
 * Author URI: https://richtabor.com
 * Version: @@pkg.version
 * Text Domain: @@textdomain
 * Domain Path: languages
 * Requires at least: @@pkg.requires
 * Tested up to: @@pkg.tested_up_to
 *
 * The following was made possible in part by the Gutenberg Boilerplate
 * Check it out - https://github.com/ahmadawais/Gutenberg-Boilerplate
 *
 * GutenKit is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, either version 2 of the License, or
 * any later version.
 *
 * GutenKit is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with GutenKit. If not, see <http://www.gnu.org/licenses/>.
 *
 * @package   @@pkg.title for Gutenberg
 * @author    @@pkg.author
 * @license   @@pkg.license
 */

/**
 * Main GutenKit Lite Spacer Block
 *
 * @since 1.0.0
 */
class Gutenkit_Lite_Spacer_Block {

	/**
	 * This plugin's instance.
	 *
	 * @var Gutenkit_Lite_Spacer_Block
	 */
	private static $instance;

	/**
	 * Registers the plugin.
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new Gutenkit_Lite_Spacer_Block();
		}
	}

	/**
	 * The base directory path (without trailing slash).
	 *
	 * @var string $_url
	 */
	private $_dir;

	/**
	 * The base URL path (without trailing slash).
	 *
	 * @var string $_url
	 */
	private $_url;

	/**
	 * The Plugin version.
	 *
	 * @var string $_version
	 */
	private $_version;

	/**
	 * The Constructor.
	 */
	private function __construct() {

		$this->_version = '@@pkg.version';
		$this->_slug    = 'gutenkit-lite-spacer-block';
		$this->_dir     = untrailingslashit( plugin_dir_path( __FILE__ ) );
		$this->_url     = untrailingslashit( plugins_url( '/', __FILE__ ) );

		add_action( 'plugins_loaded', array( $this, 'plugins_loaded' ) );
	}

	/**
	 * Add actions to enqueue assets.
	 *
	 * @access public
	 */
	public function plugins_loaded() {
		add_action( 'enqueue_block_editor_assets', array( $this, 'enqueue_block_editor_assets' ) );
	}

	/**
	 * Enqueue block assets for use within Gutenberg.
	 *
	 * @access public
	 */
	public function enqueue_block_editor_assets() {

		// Scripts.
		wp_enqueue_script(
			$this->_slug,
			$this->_url . '/block/build/index.js',
			array( 'wp-blocks', 'wp-i18n', 'wp-element' ),
			$this->_version
		);

		// Styles.
		wp_enqueue_style(
			$this->_slug . '-editor',
			$this->_url . '/block/build/editor.css',
			array( 'wp-edit-blocks' ),
			$this->_version
		);
	}

}

Gutenkit_Lite_Spacer_Block::register();
