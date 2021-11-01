import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup'
import React, { useEffect, useState } from 'react'
import { Form, Button, Row, Col } from 'react-bootstrap';
import { useForm } from 'react-hook-form'
import CustomFormSelect from '../CustomFormSelect';
import { createAddress } from '../../app/api/address';
import { useHistory } from 'react-router';

const schema = yup.object({
  nama: yup.string().required('Nama alamat harus diisi'),
  detail: yup.string().required('Detail alamat harus diisi'),
  provinsi: yup.object().required('Provinsi belum dipilih').nullable(),
  kabupaten: yup.object().required('Kabupaten belum dipilih').nullable(),
  kecamatan: yup.object().required('Kecamatan belum dipilih').nullable(),
  kelurahan: yup.object().required('kelurahan belum dipilih').nullable(),
}).required();

export default function AddAddress() {
  const { register, formState: { errors }, handleSubmit, setValue, getValues, watch} = useForm({
    resolver: yupResolver(schema)
  });
  const [status, setStatus] = useState('idle');
  const history = useHistory();
  const updateValue = (field, value) => setValue(field, value, {shouldValidate: true, shouldDirty: true});
  const allField = watch();

  const onSubmit = async formData => {
    const payload = {
      nama: formData.nama,
      detail: formData.detail,
      provinsi: formData.provinsi.label,
      kabupaten: formData.kabupaten.label,
      kecamatan: formData.kecamatan.label,
      kelurahan: formData.kelurahan.label,
    }

    setStatus('process');
    const { data } = await createAddress(payload);
    if(!data.error) {
      setStatus('success');
      history.push('/account/address');
    }
  }

  useEffect(() => {
    setValue('kabupaten', null);
    setValue('kecamatan', null);
    setValue('kelurahan', null);
  }, [allField.provinsi, setValue]);
  useEffect(() => {
    setValue('kecamatan', null);
    setValue('kelurahan', null);
  }, [allField.kabupaten, setValue]);
  useEffect(() => {
    setValue('kelurahan', null);
  }, [allField.kecamatan, setValue]);

  return (
    <Form onSubmit={handleSubmit(onSubmit)}>
      <Row>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="nama">
            <Form.Label>Nama</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Masukan nama alamat" 
              isInvalid={errors.nama}
              {...register('nama')}
            />
            <Form.Control.Feedback type="invalid">
              { errors.nama?.message }
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="detail">
            <Form.Label>Detail alamat</Form.Label>
            <Form.Control 
              type="text" 
              placeholder="Masukan detail alamat" 
              as="textarea"
              isInvalid={errors.nama}
              rows={9}
              {...register('detail')}
            />
            <Form.Control.Feedback type="invalid">
              { errors.detail?.message }
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
        <Col md={6}>
          <Form.Group className="mb-3" controlId="provinsi">
            <Form.Label>Provinsi</Form.Label>
            <CustomFormSelect
              onChange={value => updateValue('provinsi', JSON.parse(value))}
              isInvalid={errors.provinsi}
              value={getValues()?.provinsi?.value}
              location="provinsi"
            />
            <Form.Control.Feedback type="invalid">
              { errors.provinsi?.message }
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="kabupaten">
            <Form.Label>Kabupaten</Form.Label>
            <CustomFormSelect
              onChange={value => updateValue('kabupaten', JSON.parse(value))}
              isInvalid={errors.kabupaten}
              code={getValues().provinsi?.value}
              location="kabupaten"
              value={getValues()?.kabupaten?.value}
            />
            <Form.Control.Feedback type="invalid">
              { errors.kabupaten?.message }
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="kecamatan">
            <Form.Label>Kecamatan</Form.Label>
            <CustomFormSelect
              onChange={value => updateValue('kecamatan', JSON.parse(value))}
              isInvalid={errors.kecamatan}
              code={getValues().kabupaten?.value}
              location="kecamatan"
              value={getValues()?.kecamatan?.value}
            />
            <Form.Control.Feedback type="invalid">
              { errors.kecamatan?.message }
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="kelurahan">
            <Form.Label>Kelurahan</Form.Label>
            <CustomFormSelect
              onChange={value => updateValue('kelurahan', JSON.parse(value))}
              isInvalid={errors.kelurahan}
              code={getValues().kecamatan?.value}
              location="kelurahan"
              value={getValues()?.kelurahan?.value}
            />
            <Form.Control.Feedback type="invalid">
              { errors.kelurahan?.message }
            </Form.Control.Feedback>
          </Form.Group>
        </Col>
      </Row>
      
      <div className="d-grid gap-2">
        <Button type="submit" variant="danger" disabled={status === 'process'}>
          { status === 'process' ? 'Memproses...' : 'Simpan'}
        </Button>
      </div>
    </Form>
  )
}
