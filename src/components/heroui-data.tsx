"use client";

import type { ComponentProps, ReactNode } from "react";
import {
  Breadcrumbs,
  ComboBox,
  Input,
  Label,
  Description,
  FieldError,
  ListBox,
  Pagination,
  Table,
  type ComboBoxProps,
  type ListBoxProps,
} from "@heroui/react";
import { GlassSurface } from "./glass-surface.js";
import type { GlassConfig } from "../lib/types.js";
import styles from "./heroui-data.module.css";

export type LiquidDataOption = {
  id: string;
  label: string;
  description?: string;
};
function Lens({
  children,
  glass,
}: {
  children: ReactNode;
  glass?: GlassConfig;
}) {
  return (
    <GlassSurface
      {...glass}
      radius={22}
      blur={glass?.blur ?? 0}
      opacity={glass?.opacity ?? 0.1}
      thickness={65}
      className={styles.surface}
    >
      {children}
    </GlassSurface>
  );
}
function Option({ option }: { option: LiquidDataOption }) {
  return (
    <>
      <span className={styles.optionText}>
        <Label>{option.label}</Label>
        {option.description && <Description>{option.description}</Description>}
      </span>
      <ListBox.ItemIndicator className={styles.indicator}>
        {({ isSelected }) => (isSelected ? "✓" : null)}
      </ListBox.ItemIndicator>
    </>
  );
}
export function LiquidNextUIComboBox({
  label,
  options,
  glass,
  placeholder = "Type to find a folder…",
  ...props
}: Omit<
  ComboBoxProps<LiquidDataOption>,
  "children" | "items" | "defaultItems"
> & {
  label: string;
  options: LiquidDataOption[];
  glass?: GlassConfig;
  placeholder?: string;
}) {
  return (
    <ComboBox {...props} defaultItems={options} className={styles.field}>
      <Label className={styles.label}>{label}</Label>
      <Lens glass={glass}>
        <ComboBox.InputGroup className={styles.inputGroup}>
          <Input placeholder={placeholder} className={styles.input} />
          <ComboBox.Trigger
            className={styles.trigger}
            aria-label={`Show ${label.toLowerCase()}`}
          >
            <span aria-hidden="true">⌄</span>
          </ComboBox.Trigger>
        </ComboBox.InputGroup>
      </Lens>
      <FieldError className={styles.error} />
      <ComboBox.Popover className={styles.popover}>
        <Lens glass={glass}>
          <ListBox<LiquidDataOption>
            aria-label={label}
            className={styles.list}
            renderEmptyState={() => (
              <p className={styles.empty}>No matching folders</p>
            )}
          >
            {(option) => (
              <ListBox.Item
                id={option.id}
                textValue={option.label}
                className={styles.option}
              >
                <Option option={option} />
              </ListBox.Item>
            )}
          </ListBox>
        </Lens>
      </ComboBox.Popover>
    </ComboBox>
  );
}
export function LiquidNextUIListBox({
  label,
  options,
  glass,
  isDisabled,
  ...props
}: Omit<ListBoxProps<LiquidDataOption>, "children" | "items"> & {
  label: string;
  options: LiquidDataOption[];
  glass?: GlassConfig;
  isDisabled?: boolean;
}) {
  return (
    <Lens glass={glass}>
      <ListBox
        {...props}
        aria-label={label}
        selectionMode={props.selectionMode ?? "single"}
        disabledKeys={
          isDisabled ? options.map((option) => option.id) : props.disabledKeys
        }
        className={styles.list}
      >
        {options.map((option) => (
          <ListBox.Item
            key={option.id}
            id={option.id}
            textValue={option.label}
            className={styles.option}
          >
            <Option option={option} />
          </ListBox.Item>
        ))}
      </ListBox>
    </Lens>
  );
}
export function LiquidNextUIBreadcrumbs({
  items,
  onNavigate,
  glass,
  isDisabled,
}: {
  items: { id: string; label: string }[];
  onNavigate: (id: string) => void;
  glass?: GlassConfig;
  isDisabled?: boolean;
}) {
  return (
    <Lens glass={glass}>
      <Breadcrumbs
        aria-label="Folder path"
        className={styles.breadcrumbs}
        separator={<span aria-hidden="true">/</span>}
      >
        {items.map((item) => (
          <Breadcrumbs.Item
            key={item.id}
            id={item.id}
            onPress={() => onNavigate(item.id)}
            isDisabled={isDisabled}
            className={styles.crumb}
          >
            {item.label}
          </Breadcrumbs.Item>
        ))}
      </Breadcrumbs>
    </Lens>
  );
}
export function LiquidNextUIPagination({
  page,
  totalPages,
  onChange,
  glass,
  isDisabled,
}: {
  page: number;
  totalPages: number;
  onChange: (page: number) => void;
  glass?: GlassConfig;
  isDisabled?: boolean;
}) {
  const count = Math.max(1, Math.floor(totalPages));
  const current = Math.max(1, Math.min(page, count));
  const numbers = Array.from(
    new Set([1, current - 1, current, current + 1, count]),
  )
    .filter((n) => n >= 1 && n <= count)
    .sort((a, b) => a - b);
  return (
    <Lens glass={glass}>
      <Pagination aria-label="File pages" className={styles.pagination}>
        <Pagination.Content className={styles.pages}>
          <Pagination.Item>
            <Pagination.Previous
              className={styles.pageButton}
              aria-label="Previous page"
              isDisabled={isDisabled || current === 1}
              onPress={() => onChange(current - 1)}
            >
              <span aria-hidden="true">‹</span>
            </Pagination.Previous>
          </Pagination.Item>
          {numbers.map((n, i) => (
            <Pagination.Item key={n} className={styles.pageItem}>
              {i > 0 && n - numbers[i - 1] > 1 && (
                <Pagination.Ellipsis className={styles.ellipsis}>
                  …
                </Pagination.Ellipsis>
              )}
              <Pagination.Link
                className={styles.pageButton}
                isActive={current === n}
                aria-label={`Page ${n}`}
                isDisabled={isDisabled}
                onPress={() => onChange(n)}
              >
                {n}
              </Pagination.Link>
            </Pagination.Item>
          ))}
          <Pagination.Item>
            <Pagination.Next
              className={styles.pageButton}
              aria-label="Next page"
              isDisabled={isDisabled || current === count}
              onPress={() => onChange(current + 1)}
            >
              <span aria-hidden="true">›</span>
            </Pagination.Next>
          </Pagination.Item>
        </Pagination.Content>
      </Pagination>
    </Lens>
  );
}
export type LiquidTableColumn = {
  id: string;
  label: string;
  isRowHeader?: boolean;
  allowsSorting?: boolean;
};
export type LiquidTableRow = { id: string; values: Record<string, ReactNode> };
export function LiquidNextUITable({
  columns,
  rows,
  glass,
  isDisabled,
  appearance = "glass",
  selectionAppearance = "subtle",
  ...props
}: Omit<ComponentProps<typeof Table.Content>, "children"> & {
  columns: LiquidTableColumn[];
  rows: LiquidTableRow[];
  glass?: GlassConfig;
  isDisabled?: boolean;
  appearance?: "glass" | "finder";
  selectionAppearance?: "subtle" | "blue";
}) {
  const content = (
    <Table
      className={`${styles.table} ${appearance === "finder" ? styles.finderTable : ""}`}
      data-table-appearance={appearance}
      data-selection-appearance={selectionAppearance}
    >
      <Table.ScrollContainer className={styles.scroll}>
        <Table.Content
          {...props}
          disabledKeys={
            isDisabled ? rows.map((row) => row.id) : props.disabledKeys
          }
          className={styles.tableContent}
        >
          <Table.Header>
            {columns.map((column) => (
              <Table.Column
                key={column.id}
                id={column.id}
                isRowHeader={column.isRowHeader}
                allowsSorting={column.allowsSorting && !isDisabled}
                className={styles.column}
              >
                {({ sortDirection }) => (
                  <Table.SortableColumnHeader sortDirection={sortDirection}>
                    {column.label}
                  </Table.SortableColumnHeader>
                )}
              </Table.Column>
            ))}
          </Table.Header>
          <Table.Body items={rows} renderEmptyState={() => "No files to show"}>
            {(row) => (
              <Table.Row id={row.id} columns={columns} className={styles.row}>
                {(column) => (
                  <Table.Cell className={styles.cell}>
                    {row.values[column.id]}
                  </Table.Cell>
                )}
              </Table.Row>
            )}
          </Table.Body>
        </Table.Content>
      </Table.ScrollContainer>
    </Table>
  );
  return appearance === "finder" ? (
    content
  ) : (
    <Lens glass={glass}>{content}</Lens>
  );
}

export function NextUITable(
  props: Omit<Parameters<typeof LiquidNextUITable>[0], "appearance">,
) {
  return <LiquidNextUITable {...props} appearance="finder" />;
}
