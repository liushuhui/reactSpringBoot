import * as AntdIcons from '@ant-design/icons';

const IconComponent = (props: { icon: keyof typeof AntdIcons }) => {
    const IconComponent = AntdIcons[props.icon] as React.FunctionComponent<React.SVGProps<SVGSVGElement>>;
    return IconComponent ? <IconComponent /> : null;
}

export default IconComponent;