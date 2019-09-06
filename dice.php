<?php
/*
Plugin Name: Dice
Description: Dices rolling for game
Version:    1
Author:      MM
*/

defined('ABSPATH') or die('Plugin file cannot be accessed directly.');

if (!class_exists('Dice')) {

	class Dice {

		/**
		 * Set up the plugin.
		 */
		function __construct() {
			add_shortcode('dice', [$this, 'shortcode']);
		}

		/**
		 * Set up the shortcode.
		 *
		 * @param	array	$atts		Attributes
		 * @param	string 	$content	Content passed in to the shortcode
		 * @return	string				Shortcode output
		 */
		function shortcode($atts, $content = null) {
			$this->enqueue_js();
			ob_start();
			require_once('forms/form.html');
			$html = ob_get_clean();
			return $html;
		}

		/**
		 * Register scripts with WordPress.
		 */
		function enqueue_js() {
			if (!wp_script_is('dice', 'enqueued')) {
				wp_register_script(
					'dice',
					plugin_dir_url(__FILE__) . 'js/dice.js'
				);
				wp_enqueue_script('dice');
			}
		}
		

	} // End class

} // End if(!class_exists)

if (!class_exists('DiceWidget')) {

	class DiceWidget extends WP_Widget{

		/**
		 * Set up the widget in the menu.
		 */
		function __construct() {
			parent::__construct(
				'dice',
				'Dice ',
				['description' => 'Dices for games']
			);
		}

		/**
		 * Register scripts with WordPress.
		 */
		function enqueue_js() {
			if (!wp_script_is('dice', 'enqueued')) {
				wp_register_script(
					'dice',
					plugin_dir_url(__FILE__) . 'js/dice.js'
				);
				wp_enqueue_script('dice');
			}
		}

		/**
		 * Runs the widget code.
		 */
		function widget($args, $instance) {
			$this->enqueue_js();
			require_once('forms/form-widget.html');
		}

	} // End class

} // End if(!class_exists)

if (class_exists('Dice')) {
	new Dice();
}

if (class_exists('DiceWidget')) {
	function register_dice_widget() {
		register_widget('DiceWidget');
	}
	add_action('widgets_init', function(){ if(is_user_logged_in()) { register_widget('DiceWidget');}});
}

