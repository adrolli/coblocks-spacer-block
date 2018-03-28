<?php
/**
 * Plugin Name: Gutenberg Spacer Block by GutenKit
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
 * Writy Companion is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with Writy Companion. If not, see <http://www.gnu.org/licenses/>.
 *
 * @package   @@pkg.title
 * @author    @@pkg.author
 * @license   @@pkg.license
 */

/**
 * Main Writy Companion Class
 *
 * @since 1.0.0
 */
class GutenKit_Spacer_Block {

	/**
	 * This plugin's instance.
	 *
	 * @var GutenKit_Spacer_Block
	 */
	private static $instance;

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
	 * The plugin version.
	 *
	 * @var string $_version
	 */
	private $_version;

	/**
	 * The plugin's slug.
	 *
	 * @var string $_slug
	 */
	private $_slug;

	/**
	 * Registers the plugin.
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new GutenKit_Spacer_Block();
		}
	}

	/**
	 * The Constructor.
	 */
	private function __construct() {
		$this->_dir     = untrailingslashit( plugin_dir_path( '/', __FILE__ ) );
		$this->_url     = untrailingslashit( plugins_url( '/', __FILE__ ) );
		$this->_slug    = 'gutenkit-lite-spacer';
		$this->_version = '@@pkg.version';

		add_action( 'plugins_loaded', array( $this, 'plugins_loaded' ) );
	}

	/**
	 * Add actions to enqueue assets.
	 *
	 * @access public
	 */
	public function plugins_loaded() {
		add_action( 'enqueue_block_assets', array( $this, 'block_assets' ) );
		add_action( 'enqueue_block_editor_assets', array( $this, 'editor_assets' ) );
	}

	/**
	 * Enqueue block assets for use within Gutenberg.
	 *
	 * @access public
	 */
	public function block_assets() {

		// Styles.
		wp_enqueue_style(
			$this->_slug . '-frontend',
			$this->_url . '/dist/blocks.style.build.css',
			array( 'wp-edit-blocks' ),
			$this->_version
		);
	}

	/**
	 * Enqueue block assets for use within Gutenberg.
	 *
	 * @access public
	 */
	public function editor_assets() {

		// Styles.
		wp_enqueue_style(
			$this->_slug . '-editor',
			$this->_url . '/dist/blocks.editor.build.css',
			array( 'wp-edit-blocks' ),
			$this->_version
		);

		// Scripts.
		wp_enqueue_script(
			$this->_slug . '-editor',
			$this->_url . '/dist/blocks.build.js',
			array( 'wp-blocks', 'wp-i18n', 'wp-element' ),
			$this->_version
		);

	}
}

GutenKit_Spacer_Block::register();
