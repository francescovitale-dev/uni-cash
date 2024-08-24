import axios from "axios";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { useToast } from "@/components/ui/use-toast";
import { Trash2, ArrowUpCircle, ArrowDownCircle, DollarSign } from "lucide-react";

const API_BASE_URL = "https://eurasmus.onrender.com/api/v1";

const TransactionList = ({ transactions, onDelete, handleList }) => {
  const { toast } = useToast();

  const handleDelete = async (id) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`${API_BASE_URL}/delete-transaction/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
      onDelete(id);

      if (transactions.length === 1) {
        window.location.reload();
      }

      toast({
        title: "Transaction deleted",
        description: "The transaction has been successfully removed.",
      });
    } catch (error) {
      console.error("Error deleting transaction:", error);
      toast({
        title: "Error",
        description: "Unable to delete transaction. Please try again.",
        variant: "destructive",
      });
    }
  };

  const incomeTransactions = transactions.filter(transaction => transaction.type === 'income');
  const expenseTransactions = transactions.filter(transaction => transaction.type === 'expense');

  const TransactionTable = ({ transactions, title, titleColor, icon: Icon }) => (
    <Card className="mb-6 bg-white dark:bg-gray-800 shadow-lg rounded-xl overflow-hidden">
      <CardContent className="p-0">
        <div className={`flex items-center justify-between ${titleColor} p-4 border-b border-gray-200 dark:border-gray-700`}>
          <div className="flex items-center">
            <Icon className="w-5 h-5 mr-2" />
            <span className="text-base sm:text-lg font-semibold">{title}</span>
          </div>
          <span className="text-sm font-medium">
            Total: €{transactions.reduce((sum, t) => sum + t.amount, 0).toFixed(2)}
          </span>
        </div>
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-gray-50 dark:bg-gray-700">
                <TableHead className="text-xs uppercase text-gray-600 dark:text-gray-300">Title</TableHead>
                <TableHead className="text-xs uppercase text-gray-600 dark:text-gray-300 hidden sm:table-cell">Category</TableHead>
                <TableHead className="text-xs uppercase text-gray-600 dark:text-gray-300">Amount</TableHead>
                <TableHead className="text-xs uppercase text-gray-600 dark:text-gray-300">Action</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {transactions.map((transaction) => (
                <TableRow key={transaction._id} className="hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
                  <TableCell className="font-medium text-gray-900 dark:text-white">
                    <div>{transaction.title}</div>
                    <div className="text-xs text-gray-500 dark:text-gray-400 sm:hidden">{transaction.category}</div>
                  </TableCell>
                  <TableCell className="text-gray-600 dark:text-gray-300 hidden sm:table-cell">{transaction.category}</TableCell>
                  <TableCell className="font-mono text-gray-600 dark:text-gray-300">€{transaction.amount.toFixed(2)}</TableCell>
                  <TableCell>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => handleDelete(transaction._id)}
                      className="h-8 w-8 text-red-500 hover:bg-red-100 dark:hover:bg-red-900 hover:text-red-600 dark:hover:text-red-400 transition-colors"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6 w-full max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
      <h2 className="text-xl sm:text-2xl font-bold text-gray-900 dark:text-white mb-6">Transactions</h2>
      <TransactionTable 
        transactions={incomeTransactions} 
        title="Income" 
        titleColor="text-green-600 dark:text-green-400"
        icon={ArrowUpCircle}
      />
      <TransactionTable 
        transactions={expenseTransactions} 
        title="Expenses" 
        titleColor="text-red-600 dark:text-red-400"
        icon={ArrowDownCircle}
      />
    </div>
  );
};

export default TransactionList;