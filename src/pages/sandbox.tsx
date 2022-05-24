import { ReactNode, useState } from 'react';
import { FaTwitter, FaFacebook, FaEdit } from 'react-icons/fa';
import {
  Button,
  CurrencyInput,
  Dropdown,
  ShortAddress,
  SimpleTable,
  SimpleTableItem,
  Switch,
  ToggleTab,
  useToggleTab,
  toastError,
  toastSuccess,
  toastWarning,
  Chip,
  ComboBox,
  ComboBoxBaseType,
  SVG,
  Checkbox,
  Modal,
  PopoverButton,
  PageBox
} from 'components/common';
import { twMerge } from 'tailwind-merge';

const comboValues: ComboBoxBaseType[] = [
  { id: 0, name: 'Empty Trash' },
  { id: 1, name: 'Save File' },
  { id: 2, name: 'Download' }
];

export const SandboxPage = () => {
  const { options, onChange, selected } = useToggleTab(['Buy NFTs', 'Sell NFTs', 'Trade NFTs'], 'Buy NFTs');
  const [currency, setCurrency] = useState<number>(12.33);
  const [checked, setChecked] = useState<boolean>(false);
  const [checked2, setChecked2] = useState<boolean>(false);
  const [switchChecked, setSwitchChecked] = useState<boolean>(false);
  const [comboValue, setComboValue] = useState<ComboBoxBaseType>(comboValues[0]);
  const [modalIsOpen, setIsOpen] = useState(false);
  const [activityTypes, setActivityTypes] = useState<string[]>(['Sell', 'Transfer', 'Make Offer']);

  const tableItems: SimpleTableItem[] = [];
  tableItems.push({ title: 'Balance', value: <div className="font-bold">23 Eth</div> });
  tableItems.push({ title: 'Budget', value: <div className="font-bold">3 Eth</div> });

  const iconClass = 'w-12 h-12 m-3';

  return (
    <PageBox>
      <SBHeader># Text</SBHeader>
      <div>
        <div className="text-primary">text-primary</div>
        <div className="text-secondary">text-secondary</div>
      </div>

      <SBHeader># Button</SBHeader>
      <div className="flex space-x-4 items-center">
        <Button variant="primary">Primary</Button>
        <Button variant="primary">Secondary</Button>
        <Button variant="outline">Outline</Button>
        <Button variant="outline">
          <div className="flex items-center space-x-2">
            <FaEdit />
            <div>With Icon</div>
          </div>
        </Button>
        <Button variant="plain" size="plain">
          Unstyled (plain)
        </Button>
        <Button variant="ghost">Ghost</Button>
      </div>

      <SBHeader># Chip</SBHeader>
      <div className="flex flex-row space-x-4">
        <Chip content="Watch" />
        <Chip left={<FaEdit />} content="Edit" active={true} />
        <Chip content={<FaTwitter />} />
        <Chip content={<FaFacebook />} />
      </div>

      <SBHeader># Checkbox</SBHeader>
      <div className="w-1/3 space-y-4">
        <Checkbox
          label="Normal Checkbox"
          checked={checked}
          onChange={(isChecked) => {
            setChecked(isChecked);
          }}
        />

        <Checkbox
          label="Checkbox on Right"
          boxOnLeft={false}
          checked={checked2}
          onChange={(isChecked) => {
            setChecked2(isChecked);
          }}
        />
      </div>

      <SBHeader># PopoverButton</SBHeader>
      <PopoverButton title="Filter" buttonClassName="font-heading">
        {activityTypes.map((type: string) => {
          const label = `${type.charAt(0).toUpperCase() + type.slice(1)}s`;

          return (
            <Checkbox
              key={type}
              label={label}
              checked={activityTypes.indexOf(type) >= 0}
              onChange={(checked) => {
                if (checked) {
                  setActivityTypes([...activityTypes, type]);
                } else {
                  setActivityTypes(activityTypes.splice(activityTypes.indexOf(type), 1));
                }

                return setActivityTypes(activityTypes);
              }}
              boxOnLeft={false}
            />
          );
        })}
      </PopoverButton>

      <SBHeader># Dropdown</SBHeader>
      <div className="flex flex-row space-x-4">
        <Dropdown
          label="Dropdown"
          items={[
            { label: 'Item 1', onClick: console.log },
            { label: 'Item 2', onClick: console.log }
          ]}
        />
        <Dropdown
          label="Custom Dropdown"
          toggler={<div className="border rounded-full py-2 px-4 bg-black text-white">Custom Toggler</div>}
          items={[
            { label: 'Item 3', onClick: console.log },
            { label: 'Item 4', onClick: console.log }
          ]}
        />
      </div>

      <SBHeader># ToggleTab</SBHeader>
      <ToggleTab options={options} selected={selected} onChange={onChange} />

      <SBHeader># SVGs </SBHeader>
      <div className="flex flex-wrap bg-slate-200">
        <SVGPreview svg={<SVG.remove className={iconClass} />} name="remove" />
        <SVGPreview svg={<SVG.avalanche className={iconClass} />} name="avalanche" />
        <SVGPreview svg={<SVG.connectImage className={iconClass} />} name="connectImage" />
        <SVGPreview svg={<SVG.coinbasewallet className={iconClass} />} name="coinbasewallet" />
        <SVGPreview svg={<SVG.coinbasewalletAlt className={iconClass} />} name="coinbasewalletAlt" />
        <SVGPreview svg={<SVG.editCircle className={iconClass} />} name="editCircle" />
        <SVGPreview svg={<SVG.ethereum className={iconClass} />} name="ethereum" />
        <SVGPreview svg={<SVG.grayDelete className={iconClass} />} name="grayDelete" />
        <SVGPreview svg={<SVG.matic className={iconClass} />} name="matic" />
        <SVGPreview svg={<SVG.metamask className={iconClass} />} name="metamask" />
        <SVGPreview svg={<SVG.metamaskAlt className={iconClass} />} name="metamaskAlt" />
        <SVGPreview svg={<SVG.solana className={iconClass} />} name="solana" />
        <SVGPreview svg={<SVG.uniswap className={iconClass} />} name="uniswap" />
        <SVGPreview svg={<SVG.walletconnect className={iconClass} />} name="walletconnect" />
        <SVGPreview svg={<SVG.walletconnectAlt className={iconClass} />} name="walletconnectAlt" />
        <SVGPreview svg={<SVG.arrowImage className={iconClass} />} name="arrowImage" />
        <SVGPreview
          svg={
            <SVG.spinner className={twMerge(iconClass, 'text-gray-200 animate-spin dark:text-gray-600 fill-black')} />
          }
          name="spinner"
        />

        <SVGPreview svg={<SVG.logo className={iconClass} />} name="logo" />
        <SVGPreview svg={<SVG.miniLogoDark className={iconClass} />} name="miniLogoDark" />
        <SVGPreview svg={<SVG.miniLogo className={iconClass} />} name="miniLogo" />
        <SVGPreview svg={<SVG.blueCheck className={iconClass} />} name="blueCheck" />
      </div>

      <SBHeader># CurrencyInput</SBHeader>
      <CurrencyInput
        value={currency}
        label="Enter offer"
        placeholder=""
        onChange={(value) => {
          setCurrency(parseFloat(value));
        }}
      />

      <SBHeader># ShortAddress</SBHeader>
      <ShortAddress
        label="Contact address:"
        address={'0x78979787978'}
        href={`/collection/xxx`}
        tooltip={'0x78979787978'}
      />

      <SBHeader># Switch</SBHeader>
      <div className="w-1/3">
        <Switch
          title="Dark mode"
          checked={switchChecked}
          onChange={() => {
            console.log('switched');
            setSwitchChecked(!switchChecked);
          }}
        />
      </div>

      <SBHeader># ComboBox</SBHeader>
      <div className="w-1/3">
        <ComboBox options={comboValues} value={comboValue} onChange={(value) => setComboValue(value)} />
      </div>

      <SBHeader># SimpleTable</SBHeader>
      <SimpleTable items={tableItems} className="w-1/3" />

      <SBHeader># Toaster</SBHeader>
      <div className="w-1/3">
        <Button onClick={() => toastSuccess('Success', 'Content (optional)')}>Success</Button>
        <Button onClick={() => toastError('Error', 'Content (optional)')}>Error</Button>
        <Button onClick={() => toastWarning('Warning', 'Content (optional)')}>Warning</Button>
      </div>

      <SBHeader># Modal</SBHeader>
      <div>
        <Button onClick={() => setIsOpen(true)}>Show Modal</Button>

        <Modal
          isOpen={modalIsOpen}
          onClose={() => setIsOpen(false)}
          okButton="Erase"
          onOKButton={() => setIsOpen(false)}
        >
          Erase Zip Drive?
        </Modal>
      </div>
    </PageBox>
  );
};

// ============================================================

interface Props {
  children: ReactNode;
}

export const SBHeader = ({ children }: Props) => {
  return <div className="my-6 px-6 py-3 bg-slate-100 font-bold rounded-lg">{children}</div>;
};

// ==========================================================================

interface Props3 {
  name: string;
  svg: JSX.Element;
}

const SVGPreview = ({ name, svg }: Props3) => {
  return (
    <div className="flex items-center flex-col m-4 text-center">
      {svg}
      {name}
    </div>
  );
};
