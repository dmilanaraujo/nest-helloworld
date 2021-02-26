import {Injectable} from '@nestjs/common';
import {Model} from "mongoose";
import {InjectModel} from '@nestjs/mongoose';
import * as PDFDocument from 'pdfkit'
import * as Excel from 'exceljs';
import {Buffer as BufferExcel} from "exceljs";
import {Trace, TraceDocument} from "./schemas/trace.schema";
import {CreateTraceInput} from './dto/create-trace.input';
import {FilterTraceInput} from "./dto/filter-trace.input";
import {PaginationTracesInput} from "./dto/pagination-traces.input";
import {PaginatedTracesResponse} from "./dto/paginated-traces-response";
import {UpdateTraceInput} from "./dto/update-trace.input";

@Injectable()
export class TracesService {
    constructor(
        @InjectModel(Trace.name) private traceModel: Model<TraceDocument>,
    ) {}

    create(createTraceInput: CreateTraceInput) {
        try {
            const createdTrace = new this.traceModel(createTraceInput);
            return createdTrace.save();
        } catch (e) {
            throw new Error(`Error in Repository to add trace: ${e}`);
        }
    }

    async findAll(where?: FilterTraceInput) {
        try {
            return this.traceModel.find(where).exec();
        } catch (e) {
            throw new Error(`Error in Service to get traces: ${e}`);
        }
    }

    async findAllPaginate(where?: FilterTraceInput, pagination?: PaginationTracesInput): Promise<PaginatedTracesResponse> {
        try {
            const total = await this.traceModel.find(where).countDocuments();
            const items = await this.traceModel
                .find(where)
                .limit(pagination.limit || -1)
                .skip(pagination.skip || 0)
                .sort(pagination.sort)
                .exec();
            return {
                items,
                count: items.length,
                total,
            };
        } catch (e) {
            throw new Error(`Error in Service to get traces: ${e}`);
        }
    }

    findOne(id: string) {
        try{
            return this.traceModel.findById(id).exec();
        } catch (e) {
            throw new Error(`Error in Service to find trace: ${e}`);
        }
    }

    findOneByTracename(tracename: string) {
        try{
            return this.traceModel.findOne({tracename}).exec();
        } catch (e) {
            throw new Error(`Error in Service to find trace: ${e}`);
        }
    }

    async update(id: string, updateTraceInput: UpdateTraceInput) {
        try {
            return  this.traceModel.findByIdAndUpdate(id, {...updateTraceInput}).exec();
        } catch (e) {
            throw new Error(`Error in Service to update traces: ${e}`);
        }
    }

    async remove(_id: string) {
        try {
            const result = await this.traceModel.deleteOne({_id}).exec();
            return result.deletedCount == 1;
        } catch (e) {
            throw new Error(`Error in Service to delete trace: ${e}`);
        }
    }


    async exportAll(where?: FilterTraceInput, format?: string) {
        if (format == 'pdf') {
            return this.exportPDF(where);
        } else {
            return this.exportExcel(where, format);
        }
    }

    async exportPDF(where?: FilterTraceInput) {
        try {
            const items = await this.findAll(where);

            const pdfBuffer: Buffer = await new Promise(resolve => {
                const doc = new PDFDocument({
                    size: 'LETTER',
                    bufferPages: true,
                });

                // customize your PDF document
                items.forEach((item) => {
                    doc.text(` ${item.email} ${item.ip} ${item.date} ${item.functionality} ${item.status}`);
                    doc.moveDown();
                });
                doc.end();

                const buffer = [];
                doc.on('data', buffer.push.bind(buffer));
                doc.on('end', () => {
                    const data = Buffer.concat(buffer);
                    resolve(data)
                })
            });

            return pdfBuffer.toString('base64');
        } catch (e) {
            throw new Error(`Error in Service to export traces : ${e}`);
        }
    }

    async exportExcel(where?: FilterTraceInput, format: string = 'excel') {
        try {
            const items = await this.findAll(where);
            const workbook = new Excel.Workbook();
            const worksheet = workbook.addWorksheet('Traces list');
            worksheet.columns = [
                {
                    header: 'Correo electronico',
                    key: 'email',
                    width: 10,
                    outlineLevel: 1, hidden: false, style: null, values:null, letter: 'a',
                    number: 1, worksheet: null, defn: null, isCustomWidth: false, isDefault: false,
                    headerCount: 1, headers: [], equivalentTo: null, collapsed:false, eachCell: null
                },
                {
                    header: 'IP',
                    key: 'ip',
                    width: 20,
                    outlineLevel: 1, hidden: false, style: null, values:null, letter: 'a',
                    number: 1, worksheet: null, defn: null, isCustomWidth: false, isDefault: false,
                    headerCount: 1, headers: [], equivalentTo: null, collapsed:false, eachCell: null
                },
                {
                    header: 'Ultimo acceso',
                    key: 'date',
                    width: 20,
                    outlineLevel: 1, hidden: false, style: null, values:null, letter: 'a',
                    number: 1, worksheet: null, defn: null, isCustomWidth: false, isDefault: false,
                    headerCount: 1, headers: [], equivalentTo: null, collapsed:false, eachCell: null
                },
                {
                    header: 'Funcionalidad',
                    key: 'functionality',
                    width: 20,
                    outlineLevel: 1, hidden: false, style: null, values:null, letter: 'a',
                    number: 1, worksheet: null, defn: null, isCustomWidth: false, isDefault: false,
                    headerCount: 1, headers: [], equivalentTo: null, collapsed:false, eachCell: null
                },
                {
                    header: 'Estado',
                    key: 'status',
                    width: 20,
                    outlineLevel: 1, hidden: false, style: null, values:null, letter: 'a',
                    number: 1, worksheet: null, defn: null, isCustomWidth: false, isDefault: false,
                    headerCount: 1, headers: [], equivalentTo: null, collapsed:false, eachCell: null
                }
            ];
            items.forEach((data, index) => {
                worksheet.addRow(data);
            });
            let buffer: BufferExcel = null;
            if (format == 'excel') {
                buffer = await workbook.xlsx.writeBuffer();
            } else {
                buffer = await workbook.csv.writeBuffer();
            }
            // Buffer.concat(buffer).toString('base64');
            return buffer.toString();
        } catch (e) {
            throw new Error(`Error in Service to export traces : ${e}`);
        }
    }
}
