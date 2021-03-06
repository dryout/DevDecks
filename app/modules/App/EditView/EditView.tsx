import * as React from 'react';
import './edit-view.scss';

import {
  MiniSlidesPanel,
  Scale,
  SmartSlide,
  ToolBar,
  UtilitiesMenu,
} from 'modules';

import SettingsMenu from './SettingsMenu/SettingsMenu';

interface IDimensions {
  width: number;
  height: number;
}

interface EditViewProps {
  deviceDimension: IDimensions;
  isDragging: boolean;
  lastSavedSlideDimensions: IDimensions;
  slide: any;
  slidesDimension: IDimensions;
  thumbnailsDimension: IDimensions;
  updateDeviceDimension: Function;
}

const EditView = ({
  deviceDimension,
  isDragging,
  lastSavedSlideDimensions,
  slide,
  slidesDimension,
  thumbnailsDimension,
  updateDeviceDimension,
}: EditViewProps) => {
  const EDIT_VIEW_WIDTH = '100vw';
  const UTILITIES_MENU_WIDTH = 295;

  const scale = Math.min( slidesDimension.width / deviceDimension.width, slidesDimension.height / deviceDimension.height);
  const { r, g, b, a } = slide.state.backgroundColor;

  return (
    <div id="container" className="flex">

      <MiniSlidesPanel />

      <div id="main-content-wrapper" className="vertical">

        <div id="menu-bar-wrapper" className="flex flex-grow">
          <ToolBar />
          <SettingsMenu
            deviceDimension={ deviceDimension }
            updateDeviceDimension={ updateDeviceDimension }/>
        </div>

        <div className="middle flex-grow">
          <div
            id="edit-slide-view"
            style={{
              backgroundColor: `rgba(${r}, ${g}, ${b}, ${a})`,
              width: `calc(${EDIT_VIEW_WIDTH} - ${UTILITIES_MENU_WIDTH}px - ${thumbnailsDimension.width}px)`,
              paddingBottom: `${(deviceDimension.height / deviceDimension.width) * 100}%`
            }}>
            <Scale isFullScreen={ false } scale={ scale }>
              <SmartSlide scale={ scale } />
            </Scale>
            <div
              className={ isDragging ? 'vertical-guideline' : null }
              style={ isDragging ? { height: slidesDimension.height } : null }></div>
            <div
              className={ isDragging ? 'horizontal-guideline' : null }
              style={ isDragging ? { width: '100%' } : null }></div>
          </div>
        </div>

      </div>

      <UtilitiesMenu styles={{ width: UTILITIES_MENU_WIDTH }}/>

    </div>
  );
};

export default EditView;
