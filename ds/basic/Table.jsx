import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';

import './Table.scss';

/* Disclaimer: only ONE per page until uniq IDS are added to this */

const TableHeader = ({ headerRow, headerExtraClass }) => {
    const headerClassNames = classNames(
        'styled-table__header-row',
        {
            [headerExtraClass]: headerExtraClass,
        },
    );

    return (
        <tr className={headerClassNames}>
            {
                headerRow.map(({ title, titleExtraClass }, index) => {
                    const titleClassName = classNames(
                        'styled-table__header-row__title',
                        {
                            [titleExtraClass]: titleExtraClass,
                        },
                    );

                    /* eslint-disable react/no-array-index-key */
                    return (
                        <th key={`table-header-${index}`} className={titleClassName}>
                            {title}
                        </th>
                    );
                    /* eslint-enable- react/no-array-index-key */
                })
            }
        </tr>
    );
};

const TableBody = ({ bodyRows }) => {
    /* eslint-disable react/no-array-index-key */
    const bodyContent = bodyRows.map((row, rowIndex) => {
        const rowContent = row.map(({ item, itemExtraClass }, index) => {
            const itemClassNames = classNames(
                'styled-table__body-row-item',
                {
                    [itemExtraClass]: itemExtraClass,
                },
            );

            return (
                <td key={`table-item-${index}`} className={itemClassNames}>{item}</td>
            );
        });

        return (
            <tr key={`table-row-${rowIndex}`} className="styled-table__body-row">
                {rowContent}
            </tr>
        );
        /* eslint-enable- react/no-array-index-key */
    });

    return bodyContent;
};

export default class Table extends PureComponent {
    static propTypes = {
        /* eslint-disable react/forbid-prop-types */
        headerExtraClass: PropTypes.string,
        headerRow: PropTypes.arrayOf(PropTypes.shape({
            title: PropTypes.string,
            titleExtraClass: PropTypes.string,
        })).isRequired,
        bodyExtraClass: PropTypes.string,
        bodyRows: PropTypes.arrayOf(PropTypes.arrayOf(PropTypes.shape({
            item: PropTypes.oneOfType([
                PropTypes.object,
                PropTypes.string,
            ]),
            itemExtraClass: PropTypes.string,
        }))).isRequired,
    }
    /* eslint-enable react/forbid-prop-types */

    static defaultProps = {
        headerExtraClass: '',
        headerRow: [],
        bodyExtraClass: '',
        bodyRows: [],
    }

    render() {
        const {
            headerExtraClass,
            headerRow,
            bodyExtraClass,
            bodyRows,
        } = this.props;

        return (
            <table className="styled-table">
                <thead>
                    <TableHeader headerRow={headerRow} headerExtraClass={headerExtraClass} />
                </thead>

                <tbody>
                    <TableBody bodyRows={bodyRows} bodyExtraClass={bodyExtraClass} />
                </tbody>
            </table>
        );
    }
}
