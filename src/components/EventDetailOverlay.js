import React, {PureComponent, PropTypes} from 'react';
import {EVENT_PROP_TYPE} from './constants';
import {getDisplayDate, getDisplayHour} from '../utils';

import './EventDetailOverlay.css';

export default class EventDetailOverlay extends PureComponent {
    static propTypes = {
        event: EVENT_PROP_TYPE.isRequired,
        onClose: PropTypes.func.isRequired
    }

    render() {
        let {event, onClose} = this.props;

        // Custom function that supports clicking ESC
        function onEscape(event) {
            if (event.keyCode === 27) {
              onClose()
            }
        }

        // Attempted outside click for closing event-detail-overlay
        // function onPageClick(event) {
        //   let boxPresent = document.getElementsByClassName('event-detail-overlay')
        //   let whereIClicked = event.target
        //   if (boxPresent && boxPresent !== whereIClicked) {
        //     onClose()
        //   }
        // }

        document.addEventListener('keydown', onEscape.bind(this))
        // document.addEventListener('click', onPageClick.bind(this))

        let {title, description, start, color, hours} = event;
        let displayDate = getDisplayDate(start);
        let startHour = (new Date(start)).getHours();


        // TODO: Fix. If hours was other than 1 the UI would break
        let endHour = startHour + hours;
        let startHourDisplay = getDisplayHour(startHour)
        let endHourDisplay = getDisplayHour(endHour);
        let displayDateTime = `${displayDate} ${startHourDisplay} - ${endHourDisplay}`

        // DONE: The event label color should match the event color
        // TODO: Add appropriate ARIA tags to overlay/dialog
        // TODO: Support clicking outside of the overlay to close it
        // DONE: Support clicking ESC to close it

        return (
            <section className="event-detail-overlay">
                <div className="event-detail-overlay__container">
                    <button
                        className="event-detail-overlay__close"
                        title="Close detail view"
                        onClick={onClose}
                    />
                    <div>
                        {displayDateTime}
                        <span
                            className={`event-detail-overlay__${color}`}
                            title={`Event label color: ${color}`}
                        />
                    </div>
                    <h1 className="event-detail-overlay__title">
                        {title}
                    </h1>
                    <p>{description}</p>
                </div>
            </section>
        );
    }
}
