<?php
/**
 * Plugin Name: CoBlocks
 * Plugin URI: https://coblocks.com
 * Description: @@pkg.description
 * Author: Rich Tabor from CoBlocks
 * Author URI: https://coblocks.com
 * Tags: gutenberg, editor, block, layout, writing
 * Version: 1.0.4
 * Text Domain: '@@pkg.name'
 * Domain Path: languages
 * Tested up to: @@pkg.tested_up_to
 *
 * @@pkg.title is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with @@pkg.title. If not, see <http://www.gnu.org/licenses/>.
 *
 * @package   @@pkg.title
 * @author    @@pkg.author
 * @license   @@pkg.license
 */

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

/**
 * Main @@pkg.title Class
 *
 * @since 1.0.0
 */
class CoBlocks_Spacer {

	/**
	 * This plugin's instance.
	 *
	 * @var CoBlocks_Spacer
	 */
	private static $instance;

	/**
	 * Registers the plugin.
	 */
	public static function register() {
		if ( null === self::$instance ) {
			self::$instance = new CoBlocks_Spacer();
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
	 * The Plugin version.
	 *
	 * @var string $_slug
	 */
	private $_slug;

	/**
	 * The Constructor.
	 */
	private function __construct() {

		$this->_version = '@@pkg.version';
		$this->_slug    = 'coblocks';
		$this->_dir     = untrailingslashit( plugin_dir_path( '/', __FILE__ ) );
		$this->_url     = untrailingslashit( plugins_url( '/', __FILE__ ) );

		add_action( 'init', array( $this, 'register_blocks' ) );
		add_action( 'init', array( $this, 'block_assets' ) );
		add_action( 'init', array( $this, 'editor_assets' ) );
	}

	/**
	 * Add actions to enqueue assets.
	 *
	 * @access public
	 */
	public function register_blocks() {

		// Return early if this function does not exist.
		if ( ! function_exists( 'register_block_type' ) ) {
			return;
		}

		// Shortcut for the slug.
		$slug = $this->_slug;

		register_block_type(
			$slug . '/spacer', array(
				'editor_script' => $slug . '-editor',
				'editor_style'  => $slug . '-editor',
				'style'         => $slug . '-frontend',
			)
		);
	}

	/**
	 * Enqueue block assets for use within Gutenberg.
	 *
	 * @access public
	 */
	public function block_assets() {

		// Styles.
		wp_register_style(
			$this->_slug . '-frontend',
			$this->_url . '/dist/blocks.style.build.css',
			array( 'wp-blocks' ),
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
		wp_register_style(
			$this->_slug . '-editor',
			$this->_url . '/dist/blocks.editor.build.css',
			array( 'wp-edit-blocks' ),
			$this->_version
		);

		// Scripts.
		wp_register_script(
			$this->_slug . '-editor',
			$this->_url . '/dist/blocks.build.js',
			array( 'wp-blocks', 'wp-i18n', 'wp-element' ),
			$this->_version
		);
	}
}

CoBlocks_Spacer::register();
