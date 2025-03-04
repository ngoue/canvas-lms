/*
 * Copyright (C) 2023 - present Instructure, Inc.
 *
 * This file is part of Canvas.
 *
 * Canvas is free software: you can redistribute it and/or modify it under
 * the terms of the GNU Affero General Public License as published by the Free
 * Software Foundation, version 3 of the License.
 *
 * Canvas is distributed in the hope that it will be useful, but WITHOUT ANY
 * WARRANTY; without even the implied warranty of MERCHANTABILITY or FITNESS FOR
 * A PARTICULAR PURPOSE. See the GNU Affero General Public License for more
 * details.
 *
 * You should have received a copy of the GNU Affero General Public License along
 * with this program. If not, see <http://www.gnu.org/licenses/>.
 */

import React from 'react'
import {render, fireEvent} from '@testing-library/react'
import {EnrollmentTreeItem} from '../EnrollmentTreeItem'

const callback = jest.fn()

const props = {
  enrollId: '1',
  id: 's1',
  label: 'Section 1',
  children: [],
  isCheck: false,
  indent: '0 0 0 0',
  updateCheck: callback,
  isMixed: false,
}

describe('EnrollmentTreeItem', () => {
  it('shows workState when passed via props', () => {
    const {getByText} = render(<EnrollmentTreeItem workState="available" {...props} />)
    expect(getByText('course status: published')).toBeInTheDocument()
  })

  it('shows only label when no workState is available', () => {
    const {getByText, queryByText} = render(<EnrollmentTreeItem {...props} />)
    expect(queryByText('course status:')).not.toBeInTheDocument()
    expect(getByText('Section 1')).toBeInTheDocument()
  })

  it('calls updateCheck when checkbox is clicked', () => {
    const {getByTestId} = render(<EnrollmentTreeItem {...props} />)
    const checkBox = getByTestId('check s1')
    fireEvent.click(checkBox)
    expect(callback).toHaveBeenCalled()
  })
})
