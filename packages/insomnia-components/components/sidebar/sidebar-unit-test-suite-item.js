// @flow
import * as React from 'react';
import styled from 'styled-components';
import { useToggle } from 'react-use';
import { motion } from 'framer-motion';
import SidebarItem from './sidebar-item';
import SvgIcon from '../svg-icon';

type Props = {|
  name: string,
  parentId: string,
  unitTests: Array<{
    _id: string,
    type: string,
    parentId: string,
    modified: number,
    created: number,
    name: string,
  }>,
  onTestSuiteClick: (
    e: SyntheticEvent<HTMLSpanElement>,
    suite: {
      _id: string,
      type: string,
      parentId: string,
      modified: number,
      created: number,
      name: string,
    },
  ) => any,
  onDeleteSuiteClick: (
    e: SyntheticEvent<HTMLSpanElement>,
    suite: {
      _id: string,
      type: string,
      parentId: string,
      modified: number,
      created: number,
      name: string,
    },
  ) => any,
  onExecuteSuiteClick: (
    e: SyntheticEvent<HTMLSpanElement>,
    suite: {
      _id: string,
      type: string,
      parentId: string,
      modified: number,
      created: number,
      name: string,
    },
  ) => any,
  onCreateTestClick: (e: SyntheticEvent<HTMLSpanElement>) => any,
  activeTestSuite: string,
  className?: string,
|};

const StyledTestSuiteActions: React.ComponentType<{}> = styled.div`
  position: absolute;
  right: 0;
  opacity: 1;
  transition: 0.3s;
  padding-right: var(--padding-md);
  div {
    padding-left: 0px !important;
  }
  span {
    margin: 0px;
    padding: 0px;
  }
  svg {
    transition: 0.2s;
    fill: var(--hl-sm) !important;
    &:hover {
      fill: var(--hl-xl) !important;
      opacity: 1;
    }
  }
`;

const StyledSection: React.ComponentType<{}> = styled(motion.ul)`
  overflow: hidden;
  box-sizing: border-box;
  transition: 0.3s;
  div {
    margin-bottom: 0px !important;
  }
`;

const StyledUnitTest: React.ComponentType<{}> = styled.span`
  padding-left: var(--padding-md);
  display: block;
`;

const StyledTestSuiteLabel: React.ComponentType<{}> = styled.span`
  font-weight: var(--font-weight-bold);
  margin: var(--padding-sm);
  user-select: none;
`;

const SidebarUnitTestSuiteItem = ({
  onTestSuiteClick,
  onDeleteSuiteClick,
  onExecuteSuiteClick,
  onCreateTestClick,
  unitTests,
  parentId,
  name,
  activeTestSuite,
  className,
}: Props) => {
  const [isToggled, toggle] = useToggle(true);

  return (
    <StyledSection>
      <SidebarItem gridLayout className={className}>
        <div onClick={toggle}>
          <SvgIcon icon={isToggled ? 'folder-open' : 'folder'} />
        </div>
        <StyledTestSuiteLabel onClick={onTestSuiteClick}>{name}</StyledTestSuiteLabel>
        {className && (
          <StyledTestSuiteActions>
            <span onClick={onDeleteSuiteClick}>
              <SvgIcon icon="trashcan" />
            </span>
            <span onClick={onExecuteSuiteClick}>
              &nbsp;
              <SvgIcon icon="play" />
            </span>
            <span onClick={onCreateTestClick}>
              <SvgIcon icon="plus" />
            </span>
          </StyledTestSuiteActions>
        )}
      </SidebarItem>
      <motion.div
        initial={{ height: isToggled ? '100%' : '0px', display: isToggled ? 'block' : 'none' }}
        animate={{ height: isToggled ? '100%' : '0px' }}
        transition={{ duration: 0.2, ease: 'easeInOut', delay: 0 }}>
        {unitTests.length !== 0 &&
          unitTests
            .filter(unitTest => unitTest.parentId === parentId)
            .map(filteredUnitTest => (
              <SidebarItem key={filteredUnitTest._id}>
                <StyledUnitTest>
                  <SvgIcon icon="file" />
                  <span onClick={onTestSuiteClick}>{filteredUnitTest.name}</span>
                </StyledUnitTest>
              </SidebarItem>
            ))}
      </motion.div>
    </StyledSection>
  );
};

export default SidebarUnitTestSuiteItem;
