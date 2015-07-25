<?php
/** 
 *------------------------------------------------------------------------------
 * @package       Canvas Framework for Joomla!
 *------------------------------------------------------------------------------
 * @copyright     Copyright (C) 2004-2013 ThemezArt.com. All Rights Reserved.
 * @license       GNU General Public License version 2 or later; see LICENSE.txt
 * @authors       ThemezArt, JoomlaBamboo, (contribute to this project at github 
 *                & Google group to become co-author)
 * @Google group: https://groups.google.com/forum/#!forum/canvasfw
 * @Link:         http://canvas-framework.org 
 *------------------------------------------------------------------------------
 */

//prevent direct access
defined('_JEXEC') or die;

class CANVASTemplateWidgetMainnav extends CANVASTemplateWidget{

    public $name = 'mainnav';
	public $params = null;
	public $doc = null;
	
	public function __construct($params=null)
	 {
		//parent::__construct();
		$this->params = $params;
		$this->doc = JFactory::getDocument();
	 }
	
    public function renders()
    {
		$CANVASTemplate = new CANVASTemplate();
		$path = CANVASPath::getPath('tpls/widgets/' . $this->name . '.php');
		ob_start();
			if ($path) {
				include $path;
			} else {			
			?>
				<!-- MAIN NAVIGATION -->
				</div>
			<?php
			}
		return ob_get_clean();

    }
	function getParam($name, $default = null) {
		if (!$this->params)
			return $default;
		return $this->params->get($name, $default);
	}
	
}