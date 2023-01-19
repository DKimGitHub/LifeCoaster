'use client';
import { Modal } from '@nextui-org/react';
import { useContext } from 'react';
import { ListPageModalContext } from '../lib/ListPageModalProvider';


export default function ListPageModal({children} : {children: React.ReactNode}) {
    let { visible, setVisible } = useContext(ListPageModalContext);

    return (<Modal         
        aria-labelledby="Post-Modal"
        open={visible}
        onClose={()=>setVisible(false)}>
            this is inside modal 
        {children}
    </Modal>);
}