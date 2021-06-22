import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';

export class CustomLink extends React.Component {
    constructor() {
        super();

        this.onClick = this.onClick.bind(this);
    }

    onClick(e) {
        if (this.props.hasSubMenu) this.props.toggleSubMenu(e);
        else {

            this.props.activateMe({
                newLocation: this.props.to,
                selectedMenuLabel: this.props.label,
            });
        }
    }

    render() {

        const { children, className, active, classNameActive, hasActiveChild, classNameHasActiveChild, to, hasSubMenu, toggleSubMenu, activateMe, externalLink } = this.props;

        return <a
            className={classnames(
                className,
                active && classNameActive,
                hasActiveChild && classNameHasActiveChild,
            )}
            // href={to}
            onClick={this.onClick}
            target={externalLink ? '_blank' : undefined}
        >{children}</a>
    }
};